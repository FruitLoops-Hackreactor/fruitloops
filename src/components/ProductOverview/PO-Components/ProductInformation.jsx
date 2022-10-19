import { useState, useEffect } from 'react'
import { IconStar, IconChevronDown, IconPlus } from '@tabler/icons'
import axios from 'axios'
import StyleSelector from './StyleSelector'
import '@/styles/productOverview/productInformation.css'

export default function ProductInformation({ product }) {
  return (
    <div className="prodInfo-container">
      <div className="product-info">
        <div className="star-reviews space">Read all reviews</div>
        <div className="category-title space">CATEGORY</div>
        <div className="product-name space">{product.name}</div>
        <div className="product-price space">${product.default_price}</div>
      </div>

      <div className="styleSelector-container">
        <StyleSelector product={product} id={product.id} />
        <button className="select-size space">
          SELECT SIZE
          <IconChevronDown className="icon-down" />
        </button>
        <button className="select-qty space">
          1
          <IconChevronDown className="icon-down" />
        </button>
      </div>

      <div className="atc-container">
        <button className="add-to-bag">
          ADD TO BAG <IconPlus className="icon-plus" />
        </button>
        <IconStar className="icon-star" />
      </div>
    </div>
  )
}

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
