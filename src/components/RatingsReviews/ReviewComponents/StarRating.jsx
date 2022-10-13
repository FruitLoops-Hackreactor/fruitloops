//create star rating react component

import React from 'react'

const StarRating = (props) => {

  var convertRating = (rating) => {
    switch (rating) {
      case 1:
        return '★☆☆☆☆'
        break
      case 2:
        return '★★☆☆☆'
        break
      case 3:
        return '★★★☆☆'
        break
      case 4:
        return '★★★★☆'
        break
      case 5:
        return '★★★★★'
        break
      default:
        return '☆☆☆☆☆'
        break
    }
  }

  return (
    <div>
      <span className="starRating">{convertRating(props.rating)}</span>
    </div>
  )
}

export default StarRating
