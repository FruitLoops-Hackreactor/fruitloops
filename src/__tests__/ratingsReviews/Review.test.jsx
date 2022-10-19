import { render } from '@testing-library/react'
import Review from '@/components/RatingsReviews/Review'

// Test suite is currently skipping, remove the 'x' to run the test suite
describe('Review', () => {
  it('should pass', () => {
    expect(true).toBe(true)
  })

  it('should render a review', () => {
    // Refer to docs on how to get the element you want to test
    // https://testing-library.com/docs/queries/about/
    const review = {
      rating: 5,
      body: 'uwu',
      summary: 'owo',
      date: '2021-05-19T00:00:00.000Z',
    }
    const { queryByTestId } = render(<Review review={review} />)
    expect(queryByTestId('review')).toBeTruthy()
  })
})
