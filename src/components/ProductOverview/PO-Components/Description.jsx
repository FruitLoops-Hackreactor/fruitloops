import { useState, useEffect } from 'react'
import '@/styles/productOverview/description.css'

export default function Description({ product, id }) {
  const listItems = product?.features?.map((feature, index) => (
    <li key={index}>{`${feature.feature}: ${feature.value}`}</li>
  ))

  return (
    <div className="description-container">
      <div className="slogan">{product.slogan}</div>
      <br></br>
      <div className="desc-summary">{product.description}</div>
      <br></br>
      <ul className="features">{listItems}</ul>
    </div>
  )
}
