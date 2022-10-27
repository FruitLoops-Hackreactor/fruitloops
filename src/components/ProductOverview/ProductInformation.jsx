import { useState } from 'react'
import StyleSelector from './StyleSelector'
import AddToCart from './AddToCart'
import Description from './Description'
import '@/styles/productOverview/productInformation.css'

export default function ProductInformation({ product, changePhotos, expand }) {
  const [skus, setSkus] = useState([])
  const [salePrice, setSalePrice] = useState('')

  if (!product) return
  // console.log('product in prodinfo', product)

  const skusHandler = (skusObj) => {
    // console.log('these are the SKUs', skusObj)
    setSkus(skusObj)
  }

  const percentFormat = () => {
    const percentOff = 100 - (Number(salePrice) / Number(product.default_price)) * 100 || 1
    return Math.round(percentOff)
  }

  return (
    <div className={expand === false ? 'prodInfo-container' : 'prodInfo-container-invisible'}>
      <div className="product-info">
        {/* <div className="brand-name space">BRANDLESS</div> */}
        <div className="category-title space">{product.category}</div>
        <div className="product-name space">{product.name}</div>
        {salePrice && <div className="sale-price-msg">LOWEST PRICE OF THE SEASON</div>}
        <div className="price-container">
          {!salePrice ? (
            <span className="default-price">${product.default_price}</span>
          ) : (
            <div>
              <span className="sale-price">${salePrice}</span>
              <span className="og-price">${product.default_price}</span>
              <span className="percent-off">{percentFormat()}% discount </span>
            </div>
          )}
        </div>
      </div>

      <div className="styleSelector-container">
        <StyleSelector
          product={product}
          id={product.id}
          skusHandler={skusHandler}
          changePhotos={changePhotos}
          setSalePrice={setSalePrice}
        />
        <AddToCart skus={skus} />
      </div>
      <Description product={product} />
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
