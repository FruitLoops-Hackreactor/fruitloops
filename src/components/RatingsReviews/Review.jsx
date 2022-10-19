import StarRating from './ReviewComponents/StarRating.jsx'
import Body from './ReviewComponents/Body.jsx'
import Summary from './ReviewComponents/Summary.jsx'
import ReviewDate from './ReviewComponents/ReviewDate.jsx'
import React from 'react'

const Review = (props) => {
  return (
    <div data-testid="review">
      <StarRating rating={props.review.rating} />
      <Summary summary={props.review.summary} />
      <Body body={props.review.body} />
      <ReviewDate date={props.review.date} />
    </div>
  )
}

export default Review
