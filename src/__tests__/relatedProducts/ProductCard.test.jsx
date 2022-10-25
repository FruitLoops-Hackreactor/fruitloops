import { render } from '@testing-library/react'
import ProductCard from '@/components/RelatedProducts/ProductCard'
import product from '../mocks/product'

// Need to mock the store
jest.mock('@/utils/fastContext', () => ({
  useStore: jest.fn(() => [jest.fn(), jest.fn()]),
}))

describe('RelatedProducts - ProductCard', () => {
  const actionHandler = () => null
  const onProductClick = () => null

  it('should render', () => {
    const action = 'compare'
    const { queryByTestId } = render(
      <ProductCard {...{ product, onProductClick, action, actionHandler }}></ProductCard>
    )

    expect(queryByTestId('product-card')).toBeTruthy()
  })
})
