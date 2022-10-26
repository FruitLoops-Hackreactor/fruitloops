import { screen, render } from '@testing-library/react'
import ProductInformation from '@/components/ProductOverview/PO-Components/ProductInformation'

jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: [] })),
}))

describe('product information', () => {
  it('should pass when passed in a legitimate product', () => {
    const value = {
      category: 'Pants',
      default_price: '40.00',
      name: 'Morning Joggers',
    }

    render(<ProductInformation product={value} />)
    expect(document.querySelector('.product-info')).toBeTruthy()
  })

  it('should not render sale price message when passed in nothing', () => {
    render(<ProductInformation />)
    const staticText = screen.queryByLabelText('LOWEST PRICE OF THE SEASON')
    expect(staticText).toBeFalsy()
  })
})
