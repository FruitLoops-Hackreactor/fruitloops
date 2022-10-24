import { useRef, useCallback, createContext, useContext, useSyncExternalStore } from 'react'

const Context = createContext(null)

/**
 * This is best used for a form or anything that uses high velocity data. Place
 * the provider around the form and then use the hook to contain the data. This
 * will prevent unnecessary re-renders and only render each input element that
 * was updated.
 *
 * This can also be used as a global store for the App to prevent unnecessary
 * re-renders of the entire App, such as when using React's Context API.
 */
export function createFastContext(intitialState) {
  function useStoreData() {
    const store = useRef(intitialState)
    /**
     * Track all subscribers to the store so that we can call them when the store
     * is updated.
     *
     * We use two separate sets so that we can call all subscribers when the entire
     * store is updated with new data, and only call the subscribers for a
     * specific key when that key is updated.
     *
     * A set is used for the value of the keys `select` property so that we can have
     * multiple subscribers for a specific key.
     */
    const subscribers = useRef({ select: {}, all: new Set() })
    /**
     * Returns the current store data.
     *
     * `useCallback` is used so that it is memoized and doesn't change on every
     * render. This is important because if it is used as a dependency in a
     * `useEffect` or `useMemo` hook, it will trigger it since the function
     * will be a new instance on every render.
     */
    const get = useCallback(() => store.current, [])
    /**
     * Updates the store with new data and calls all relevant subscribers.
     *
     * If a key is specified, only the property with that key will be updated and
     * trigger the subscribers for that key. Otherwise, the entire store will be
     * updated and all subscribers will be called. Every subscriber has to be called
     * because it is used to trigger a re-render of the component that is using the
     * hook.
     *
     * `useCallback` is used so that it is memoized and doesn't change on every
     * render. The `key` is outside of the callback so that the actuall callback
     * doesn't change on every render when we manually invoke it in `useExternalStoreSync`
     * in the `useStore` hook.
     */
    const set = (key) =>
      useCallback((value) => {
        if (!subscribers.current) {
          throw new Error('No subscribers')
        }

        if (key) {
          store.current = { ...store.current, [key]: value }

          if (subscribers.current.select[key]) {
            subscribers.current.select[key].forEach((callback) => callback())
          }
        } else {
          store.current = { ...store.current, ...value }
          subscribers.current.all.forEach((callback) => callback())
          subscribers.current.select.forEach((callback) => callback())
        }
      }, [])
    /**
     * Subscribe to the store with a callback that will be called when the store
     * is updated with new data.
     *
     * The returned function is a cleanup function that will be called when
     * the component unmounts.
     * */
    const subscribe = (key) =>
      useCallback((callback) => {
        if (key) {
          if (!subscribers.current.select[key]) {
            subscribers.current.select[key] = new Set()
          }
          subscribers.current.select[key].add(callback)
        } else {
          subscribers.current.all.add(callback)
        }
        // The cleanup only removes the individual callback from the set.
        return () => {
          if (key) {
            subscribers.current.select[key].delete(callback)
            // If there are no more subscribers for this key, remove the key
            if (subscribers.current.select[key].size === 0) {
              delete subscribers.current.select[key]
            }
          } else {
            subscribers.current.all.delete(callback)
          }
        }
      }, [])

    return {
      get,
      set,
      subscribe,
    }
  }

  return ({ children }) => <Context.Provider value={useStoreData()}>{children}</Context.Provider>
}

/**
 * The hook to access the store.
 */
export const useStore = (key, selector) => {
  const store = useContext(Context)

  if (!store) {
    throw new Error('Store not found')
  } else if (typeof key === 'function' || (!key && selector)) {
    throw new Error('Cannot specify a selector without a key')
  }

  let stateSelector

  // If no key or selector is provided, return the entire store.
  if (!key) {
    stateSelector = (state) => state
    // If a selector is provided, return the value returned by the selector.
  } else if (selector) {
    stateSelector = selector
    // Otherwise, set the selector to the key and return the value of the key.
  } else {
    stateSelector = (state) => state[key]
  }

  /**
   * The `useSyncExternalStore` hook is used to subscribe to the store and get
   * the current value of the store, which the selector will be applied to
   * to get the value specific to the caller of the hook.
   */
  const state = useSyncExternalStore(store.subscribe(key), () => stateSelector(store.get()))

  // Return the tuple of the state and the setter function.
  return [state, store.set(key)]
}
