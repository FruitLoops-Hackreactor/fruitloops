import { render } from '@testing-library/react'
import Review from '@/components/RatingsReviews/Review'

// Test suite is currently skipping, remove the 'x' to run the test suite
xdescribe('Review', () => {
  it('should pass', () => {
    expect(true).toBe(true)
  })

  it('should render a review', () => {
    // Refer to docs on how to get the element you want to test
    // https://testing-library.com/docs/queries/about/
    const { findByTestId } = render(<Review />)
    expect(true).toBe(true)
  })
})
