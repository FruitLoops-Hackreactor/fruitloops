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

const getProducts = async () => {
  try {
    // Get the products from the API
    const products = await axios.get('/products').then((res) => res.data)
    // Get each product with the details
    return await Promise.all(
      products.map(async ({ id }) => ({
        ...(await axios.get(`/products/${id}`).then((res) => res.data)),
        thumbnail: await axios
          .get(`/products/${id}/styles`)
          .then((res) => res.data.results[0].photos[0].thumbnail_url),
      }))
    )
  } catch (err) {
    console.error(err)
    return []
  }
}

const FETCH_DELAY = 1000

export default function RelatedProducts() {
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState([])
  const [slideIdx, setSlideIdx] = useState(0)

  useEffect(() => {
    setTimeout(() => {
      getProducts().then((products) => {
        setLoading(false)
        setProducts(products)
      })
    }, FETCH_DELAY)
  }, [])

  return (
    <section>
      <div className="section-title">
        <h3>Related Products</h3>
      </div>

      <div className="related-products">
        <div className={`overlay ${slideIdx === 0 ? 'right' : 'left'}`}></div>

        <div className="products">
          {!loading && !products.length ? (
            <div className="no-products">
              <h3>No related products found</h3>
            </div>
          ) : loading ? (
            Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={`skeleton-card-${i}`} />)
          ) : (
            products.map((product) => (
              <div className="product-card">
                <div className="img">
                  <img src={product.thumbnail} alt={product.name} />
                </div>
                <div className="info">
                  <div>
                    <h4>{product.category}</h4>
                  </div>
                  <div>
                    <h3 className="product-name">{product.name}</h3>
                  </div>
                  <div>
                    <h4>${product.default_price}</h4>
                  </div>
                  <div>
                    <h4>Ratings</h4>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
