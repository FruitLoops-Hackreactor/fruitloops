import Review from './Review.jsx'
import React from 'react'

const ReviewsList = (props) => {
  return (
    <div>
      {props.reviews.map((review) => {
        return <Review review={review} key={review.review_id} />
      })}
    </div>
  )
}

export default ReviewsList
