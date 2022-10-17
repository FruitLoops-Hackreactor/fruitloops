import { useState, useEffect } from 'react'
import axios from 'axios'

export default function ProductInformation({ currentProduct }) {
  /*product = {
    id: number,
    name: string,
    slogan: string,
    campus: string,
    category: string,
    created_at: string,
    default_price: string,
    description: string,
    features: Array({feature: string, value: string}, {...}),
    updated_at: string
  }*/

  const [product, setProduct] = useState({})

  useEffect(() => {
    axios.get(`/products/${currentProduct?.id}`).then((prodInfo) => {
      setProduct(prodInfo.data)
      // console.log('this is from prodInfo', prodInfo.data)
    })
  }, [currentProduct])

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
