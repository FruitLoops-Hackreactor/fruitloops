import { useState, useEffect } from 'react'
import { IconStar, IconChevronDown, IconPlus } from '@tabler/icons'
import axios from 'axios'
import StyleSelector from './StyleSelector'
import AddToCart from './AddToCart'
import '@/styles/productOverview/productInformation.css'

export default function ProductInformation({ product, changePhotos }) {
  const [skus, setSkus] = useState([])

  const skusHandler = (skusObj) => {
    // console.log('these are the SKUs', skusObj)
    setSkus(skusObj)
  }

  return (
    <div className="prodInfo-container">
      <div className="product-info">
        <div className="brand-name space">BRANDLESS</div>
        <div className="category-title space">{product.category}</div>
        <div className="product-name space">{product.name}</div>
        <div className="product-price space">${product.default_price}</div>
      </div>

      <div className="styleSelector-container">
        <StyleSelector
          product={product}
          id={product.id}
          skusHandler={skusHandler}
          changePhotos={changePhotos}
        />
        <AddToCart skus={skus} />
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
