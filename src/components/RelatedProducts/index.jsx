import { useState, useEffect } from 'react'
import axios from 'axios'
import '../../styles/relatedProducts.css'

export default function RelatedProducts() {
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState([])

  useEffect(() => {
    axios.get('/products').then((response) => {
      setLoading(false)
      setProducts(response.data)
    })
  }, [])

  console.log('products', products)

  return (
    <section>
      <div className="section-title">
        <h3>Related Products</h3>
      </div>

      <div className="product-card">
        <div className="img"></div>
        <div className="info">
          <div>
            <h4>Category</h4>
          </div>
          <div>
            <h2>Product name</h2>
          </div>
          <div>
            <h4>Price</h4>
          </div>
          <div>
            <h4>Ratings</h4>
          </div>
        </div>
      </div>
    </section>
  )
}
