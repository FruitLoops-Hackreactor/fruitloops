import { screen, render, fireEvent } from '@testing-library/react'
import AddToCart from '@/components/ProductOverview/PO-Components/AddToCart'

describe('add to cart', () => {
  it('should render when passed in an sku', () => {
    const value = { 1394769: { quantity: 8, size: 'XS' } }
    render(<AddToCart skus={value} />)
    expect(document.querySelector('.atc-container')).toBeTruthy()
  })

  it('should pass when passed in a legitimate sku', () => {
    const value = {
      1394769: { quantity: 8, size: 'XS' },
      1394770: { quantity: 16, size: 'S' },
      1394771: { quantity: 17, size: 'M' },
      1394772: { quantity: 10, size: 'L' },
      1394773: { quantity: 15, size: 'XL' },
      1394774: { quantity: 4, size: 'XXL' },
    }

    render(<AddToCart skus={value} />)
    expect(document.querySelector('.atc-container')).toBeTruthy()
  })

  it('should render error popup when user clicks add to cart without selecting size or qty', () => {
    const value = {
      1394769: { quantity: 8, size: 'XS' },
      1394770: { quantity: 16, size: 'S' },
      1394771: { quantity: 17, size: 'M' },
      1394772: { quantity: 10, size: 'L' },
      1394773: { quantity: 15, size: 'XL' },
      1394774: { quantity: 4, size: 'XXL' },
    }
    render(<AddToCart skus={value} />)
    const checkout = screen.getByRole('button', { name: 'cart' })
    fireEvent.click(checkout)
    expect(screen.queryByText('Please select a size and quantity.')).toBeTruthy()
  })

  it('should display a drop down menu when user clicks select size and select qty', async () => {
    const value = {
      1394769: { quantity: 8, size: 'XS' },
      1394770: { quantity: 16, size: 'S' },
    }
    render(<AddToCart skus={value} />)
    fireEvent.click(document.querySelector('.select-size'))
    fireEvent.click(document.querySelector('.select-qty'))

    expect(screen.queryByText('SELECT SIZE')).toBeTruthy()
    expect(screen.queryByText('SELECT QTY')).toBeTruthy()
    expect(screen.getByRole('option', { name: 'SELECT SIZE' }).selected).toBe(true)
    expect(screen.getByRole('option', { name: 'SELECT QTY' }).selected).toBe(true)
    expect(screen.getAllByRole('option').length).toBe(4)
  })
})
