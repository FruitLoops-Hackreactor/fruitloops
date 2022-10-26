import { render } from '@testing-library/react'
import Products from '@/components/RelatedProducts/Products'

jest.mock('@/utils/fastContext', () => ({
  useStore: jest.fn(() => [jest.fn(), jest.fn()]),
}))

describe('RelatedProducts - Products', () => {
  const max = 4
  const loading = false
  const currentProduct = undefined
  const relatedProducts = []

  it('should render', () => {
    render(<Products {...{ max, loading, currentProduct, relatedProducts }}></Products>)

    expect(document.querySelector('.related-products')).toBeTruthy()
  })
})
