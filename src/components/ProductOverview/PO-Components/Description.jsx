import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Description({ id }) {
  id = id ? id : 40344 // delete this later

  const [product, setProduct] = useState({})

  useEffect(() => {
    axios.get(`/products/${id}`).then((prodInfo) => {
      // console.log('this is from getting product info for 1 id:', prodInfo.data)
      setProduct(prodInfo.data)
    })
  }, [])

  const listItems = product?.features?.map((feature) => (
    <li>{`${feature.feature}: ${feature.value}`}</li>
  ))
  // console.log('this is product.features:', product.features)
  // console.log('these are listItems:', listItems)

  return (
    <div>
      <div className="slogan">{product.slogan}</div>
      <br></br>
      <div className="desc-summary">{product.description}</div>
      <br></br>
      <ul className="features">{listItems}</ul>
    </div>
  )
}
