import { useState, useEffect } from 'react'
import '@/styles/productOverview/description.css'

export default function Description({ product, id }) {
  const listItems = product?.features?.map((feature, index) => (
    <li key={index}>{`${feature.feature}: ${feature.value}`}</li>
  ))

  return (
    <div className="description-container">
      <div className="slogan">{product.slogan}</div>
      <div className="desc-title">PRODUCT DETAILS</div>
      <div className="desc-summary">{product.description}</div>
      <ul className="features">
        {listItems}
        <li>Imported</li>
        <li>Returns are accepted on this product</li>
      </ul>
    </div>
  )
}
