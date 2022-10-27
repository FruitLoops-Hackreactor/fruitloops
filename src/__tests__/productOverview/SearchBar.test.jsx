import { render } from '@testing-library/react'
import SearchBar from '@/components/SearchBar'

jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: [] })),
}))

describe('style selector', () => {
  it('should render', () => {
    render(<SearchBar />)
  })
})
