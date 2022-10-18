import { useState, useEffect } from 'react'
import axios from 'axios'

export default function ProductInformation({ product }) {
  // const product = {
  //   id = product.id,
  //   name = product.name,
  //   slogan = product.slogan,
  //   description = product.description,
  //   category = product.category,
  //   features = product.features,
  //   default_price = product.default_price,
  //   styles = product.styles.map((style) => ({
  //     style_id: style.style_id,
  //     name: style.name,
  //     original_price: style.original_price,
  //     sale_price: style.sale_price,
  //     default: style['default?'],
  //     photos: style.photos.map((photo) => ({
  //       thumbnail_url: photo.thumbnail_url,
  //       url: photo.url,
  //     })),
  //   }))
  // }

  return (
    <div>
      <div className="product-info">
        <div>Read all reviews</div>
        <div className="category-title">CATEGORY</div>
        <div className="product-name">{product.name}</div>
        <div className="product-price">${product.default_price}</div>
      </div>

      <div className="style-selector">
        <div>Style &gt; SELECTED STYLE</div>
      </div>

      <div className="add-to-cart">
        <div>ADD TO CART</div>
      </div>
    </div>
  )
}
