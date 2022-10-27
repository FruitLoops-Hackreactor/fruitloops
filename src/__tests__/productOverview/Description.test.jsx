import { screen, render } from '@testing-library/react'
import Description from '@/components/ProductOverview/Description'

describe('description', () => {
  it('should pass when passed in a valid product with valid properties', () => {
    const value = {
      name: 'Hoodie',
      slogan: 'This is a nice hoodie',
      description: 'Please buy our hoodie it will keep you warm',
      features: [{ feature: 'fabric', value: 'wool' }],
    }

    const { queryByTestId } = render(<Description product={value} />)

    expect(queryByTestId('description-test')).toBeTruthy()
  })

  it('should not render the html elements when passed in nothing', () => {
    render(<Description />)
    const staticText = screen.queryByLabelText('Product Description')
    expect(staticText).toBeFalsy()
  })
})
