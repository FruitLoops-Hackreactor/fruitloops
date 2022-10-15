//create star rating react component

import React from 'react'

const StarRating = (props) => {
  // Check out the tabler icons docs for some stars and half stars
  // Q already added the package since he is using icons too
  var convertRating = (rating) => {
    switch (rating) {
      case 1:
        return '★☆☆☆☆'
      case 2:
        return '★★☆☆☆'
      case 3:
        return '★★★☆☆'
      case 4:
        return '★★★★☆'
      case 5:
        return '★★★★★'
      default:
        return '☆☆☆☆☆'
    }
  }

  return (
    <div>
      <span className="starRating">{convertRating(props.rating)}</span>
    </div>
  )
}

export default StarRating
