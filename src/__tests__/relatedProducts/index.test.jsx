import { render, screen, act } from '@testing-library/react'
import RelatedProducts from '@/components/RelatedProducts'
import productMock from '../mocks/product'

jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: [] })),
}))

jest.mock('@/utils/fastContext', () => ({
  useStore: jest.fn(() => [productMock, jest.fn()]),
}))

jest.mock('@/utils/products', () => ({
  getProduct: jest.fn(() => Promise.resolve({})),
}))

describe('Related Products - index', () => {
  it('should render with a current product', async () => {
    // Need to wrap in act to avoid a warning about state updates
    await act(async () => {
      render(<RelatedProducts />)
    })

    expect(screen.queryByTestId('related-products')).toBeTruthy()
  })
})
