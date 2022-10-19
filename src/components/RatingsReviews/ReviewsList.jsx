import Review from './Review.jsx'
import { useState } from 'react'

const ReviewsList = (props) => {
  const [additionalReviews, setAdditionalReviews] = useState(0)
  const renderedReviews = props.reviews.slice(0, 2 + additionalReviews)

  return (
    <div>
      {renderedReviews.map((review) => {
        return <Review review={review} key={review.review_id} />
      })}
      <button
        onClick={() => {
          setAdditionalReviews(additionalReviews + 2)
        }}
      >
        Show More
      </button>
    </div>
  )
}

export default ReviewsList
