import { fireEvent, render, act } from '@testing-library/react'
import StyleSelector from '@/components/ProductOverview/StyleSelector'
import productMock from '../mocks/product'

jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: [] })),
}))

describe('style selector', () => {
  it('should render styleSelector with mocked data', async () => {
    await act(async () => {
      render(<StyleSelector product={productMock} id={productMock.id} />)
    })
    expect(document.querySelector('.style-container')).toBeTruthy()
  })
})
