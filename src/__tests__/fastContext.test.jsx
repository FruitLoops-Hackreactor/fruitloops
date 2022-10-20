import { renderHook } from '@testing-library/react'
import { createFastContext, useStore } from '@/utils/fastContext'

describe('fastContext', () => {
  const intitialState = {
    loading: false,
    products: [1, 2, 3],
  }
  const Provider = createFastContext(intitialState)

  it('should return the tuple of state, unmodified, and the setter', () => {
    const wrapper = ({ children }) => <Provider>{children}</Provider>
    const {
      result: {
        current: [store, setStore],
      },
    } = renderHook(() => useStore(), { wrapper })

    expect(store).toEqual(intitialState)
    expect(typeof setStore).toBe('function')
  })
})
