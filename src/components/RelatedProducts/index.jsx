import { useState, useEffect } from 'react'
import axios from 'axios'
import SkeletonCard from '../SkeletonCard'
import '../../styles/relatedProducts.css'

// type Product = {
//   id: number
//   name: string
//   slogan: string
//   description: string
//   category: string
//   default_price: string
// }

const FETCH_DELAY = 3000

export default function RelatedProducts() {
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState([])

  useEffect(() => {
    setTimeout(() => {
      axios.get('/products').then((res) => {
        setLoading(false)
        setProducts(res.data)
      })
    }, FETCH_DELAY)
  }, [])

  console.log('products', products)

  return (
    <section>
      <div className="section-title">
        <h3>Related Products</h3>
      </div>

      <div className="related-products">
        {!loading && !products.length && (
          <div className="no-products">
            <h3>No related products found</h3>
          </div>
        )}

        {loading &&
          Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={`skeleton-card-${i}`} />)}

        {!loading &&
          products.length &&
          products.map((product) => (
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
          ))}
      </div>
    </section>
  )
}
