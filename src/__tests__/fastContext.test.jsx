import { render } from '@testing-library/react'
import createFastContext from '@/utils/fastContext'

describe('fastContext', () => {
  const { Provider, useStore } = createFastContext(intitialState)
  const intitialState = {
    loading: false,
    products: [1, 2, 3],
  }
  let store, state, setState

  it('should return the tuple of state, unmodified, and the setter', () => {
    const TestComponent = () => {
      store = useStore()
      state = store[0]
      setState = store[1]
      return <div></div>
    }

    render(
      <Provider>
        <TestComponent />
      </Provider>
    )

    expect(store).toHaveLength(2)
    expect(state).toEqual(intitialState)
    expect(typeof setState).toBe('function')
  })

  // it('it should update the state when using a key as the selector', () => {
  //   const Provider = createFastContext(intitialState)
  //   const TestComponent = () => {
  //     const { result } = renderHook(useStore)
  //     console.log('result', result)
  //     // store = useStore()
  //     // state = store[0]
  //     // setState = store[1]
  //     return <div></div>
  //   }

  //   render(
  //     <Provider>
  //       <TestComponent />
  //     </Provider>
  //   )

  //   expect(state.loading).toBe(true)
  // })
})
