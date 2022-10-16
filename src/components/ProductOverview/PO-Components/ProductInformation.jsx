import { useState, useEffect } from 'react'
import axios from 'axios'

export default function ProductInformation({ id }) {
  id = id ? id : 40344

  const [product, setProduct] = useState({})

  useEffect(() => {
    axios.get(`/products/${id}`).then((prodInfo) => {
      setProduct(prodInfo.data)
      console.log('this is from prodInfo', prodInfo.data)
    })
  }, [])

  return (
    <div>
      <div></div>
    </div>
  )
}
