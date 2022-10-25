import { renderHook, act } from '@testing-library/react'
import { createFastContext, useStore } from '@/utils/fastContext'

describe('fastContext', () => {
  let StoreProvider, wrapper
  const intitialState = {
    loading: false,
    numbers: [1, 2, 3],
    food: {
      apple: '🍎',
      banana: '🍌',
      orange: '🍊',
    },
  }

  beforeEach(() => {
    StoreProvider = createFastContext(intitialState).StoreProvider
    wrapper = ({ children }) => <StoreProvider>{children}</StoreProvider>
  })

  it('should throw an error if no store is created', () => {
    const { result } = renderHook(() => {
      try {
        return useStore()
      } catch (err) {
        return err
      }
    })

    expect(result.current).toBeInstanceOf(Error)
  })

  it('should throw an error when not specifying a key with a selector', () => {
    const { result } = renderHook(
      () => {
        try {
          return useStore((state) => state)
        } catch (err) {
          return err
        }
      },
      { wrapper }
    )

    expect(result.current).toBeInstanceOf(Error)
  })

  it('should throw an error when attempting to directly use the store setter', () => {
    const { useStoreData } = createFastContext()
    const { result: store } = renderHook(() => useStoreData())

    expect(store.current).toBeInstanceOf(Object)

    const { result } = renderHook(() => {
      try {
        store.current.set('loading')(true)
      } catch (err) {
        return err
      }
    })

    expect(result.current).toBeInstanceOf(Error)
  })

  it('should return the tuple of state, unmodified, and the setter', () => {
    const {
      result: {
        current: [store, setStore],
      },
    } = renderHook(() => useStore(), { wrapper })

    expect(store).toEqual(intitialState)
    expect(typeof setStore).toBe('function')
  })

  it('should update state when the setter is called', () => {
    const {
      result: {
        current: [loading, setLoading],
      },
    } = renderHook(() => useStore('loading'), { wrapper })

    expect(loading).toBe(false)

    act(() => {
      setLoading({ loading: true })
    })

    // Place in async stack to allow for state to update.
    setTimeout(() => {
      expect(loading).toBe(true)
      expect()
    }, 0)
  })

  it('should only call the subscribe method once when subscribing to the store', () => {
    const { StoreContext, useStoreData } = createFastContext(intitialState)
    let store, subscribeSpy
    const wrapperMock = ({ children }) => {
      store = useStoreData()
      subscribeSpy = jest.spyOn(store, 'subscribe')
      return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
    }

    renderHook(() => useStore(), { wrapper: wrapperMock })

    expect(subscribeSpy).toHaveBeenCalledTimes(1)
  })

  /**
   * selector
   */
  describe('selector', () => {
    it('should only set the state for the given key', () => {
      const {
        result: {
          current: [loading, setLoading],
        },
      } = renderHook(() => useStore('loading'), { wrapper })

      expect(loading).toBe(false)
      expect(typeof setLoading).toBe('function')
    })

    it('should only set the state for the given key and selector', () => {
      const {
        result: {
          current: [numbers, setNumbers],
        },
      } = renderHook(() => useStore('numbers', (numbers) => numbers), { wrapper })

      expect(numbers).toEqual(intitialState.numbers)
      expect(typeof setNumbers).toBe('function')
    })

    it('should only set the state for the specified for the selector', () => {
      const {
        result: {
          current: [apple, setApple],
        },
      } = renderHook(() => useStore('food', (food) => food.apple), { wrapper })

      expect(apple).toEqual('🍎')
      expect(typeof setApple).toBe('function')
    })
  })
})
