import { render, waitFor, screen } from '@testing-library/react'
import RelatedProducts from '@/components/RelatedProducts'
import productMock from '../mocks/product'
import { act } from 'react-dom/test-utils'

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
    await act(async () => {
      render(<RelatedProducts />)
    })

    await waitFor(() => {
      expect(screen.queryByTestId('related-products')).toBeTruthy()
    })
  })
})
