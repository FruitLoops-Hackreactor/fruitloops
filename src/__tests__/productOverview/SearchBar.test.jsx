import { screen, render } from '@testing-library/react'
import SearchBar from '@/components/SearchBar'

jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: [] })),
}))

describe('style selector', () => {
  it('should render', () => {
    const { queryByTestId } = render(<SearchBar />)
    expect(queryByTestId('navbar-test-id')).toBeTruthy()
  })

  it('should display a generic logo', () => {
    render(<SearchBar />)
    expect(screen.queryByText('Logo')).toBeTruthy()
  })
})
