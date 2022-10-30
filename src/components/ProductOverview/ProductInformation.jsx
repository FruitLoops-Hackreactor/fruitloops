import { useState } from 'react'
import StyleSelector from './StyleSelector'
import AddToCart from './AddToCart'
import Description from './Description'
import '@/styles/productOverview/productInformation.css'

export default function ProductInformation({ product, changePhotos, expand }) {
  const [skus, setSkus] = useState([])
  const [salePrice, setSalePrice] = useState('')

  // if there is no product prop, do nothing
  if (!product) return

  // helper function to retrieve the skus of the selected style
  const skusHandler = (skusObj) => {
    setSkus(skusObj)
  }

  // helper function to format the discount
  const percentFormat = () => {
    const percentOff = 100 - (Number(salePrice) / Number(product.default_price)) * 100
    return Math.round(percentOff)
  }

  return (
    <div className={expand === false ? 'prodInfo-container' : 'prodInfo-container-invisible'}>
      <div className="product-info">
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
