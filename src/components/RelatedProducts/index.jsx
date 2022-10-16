import { useState, useEffect } from 'react'
import axios from 'axios'
import { IconChevronLeft, IconChevronRight, IconStar } from '@tabler/icons'
import SkeletonCard from '../SkeletonCard'
import '@/styles/relatedProducts.css'

// type Product = {
//   id: number
//   name: string
//   slogan: string
//   description: string
//   category: string
//   default_price: string
// }

// The number of products to request
const PROD_COUNT = 10
// The number of cards to display at a time
const NUM_CARDS = 4
// Slight delay to show the skeleton cards and give a loading effect
const FETCH_DELAY = 1500

const getProducts = async () => {
  try {
    // Get the products from the API
    const products = await axios.get(`/products?count=${PROD_COUNT}`).then((res) => res.data)
    // Get each product with the details
    return await Promise.all(
      products.map(async ({ id }) => ({
        ...(await axios.get(`/products/${id}`).then((res) => res.data)),
        // Make a single stupid request just for an image like wtf.
        // Extract just the thumbnail_url from the results
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

export default function RelatedProducts() {
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState([])
  const [slideIdx, setSlideIdx] = useState(0)
  const slideLeft = () => setSlideIdx((idx) => (idx === 0 ? 0 : idx - 1))
  const slideRight = () =>
    setSlideIdx((idx) => (idx === products.length - NUM_CARDS ? idx : idx + 1))

  // Fetch the products
  useEffect(() => {
    getProducts().then((products) => {
      // Give a 1s delay to show the skeleton cards
      setTimeout(() => {
        setLoading(false)
        setProducts(products)
      }, FETCH_DELAY)
    })
  }, [])

  /**
   * Handle the carousel. Need to grab all the product cards and shift them
   * by the amount of the slide index times the width of the card plus the
   * margin-right gap.
   */
  useEffect(() => {
    // Prevent the hook from running if there are no products
    if (!products.length) return

    const cards = document.querySelectorAll('.related-products .product-card')

    cards.forEach((card) => {
      // Get the width of the card and the margin-right gap, except when the
      // slide index is 0, then just set the transform to 0
      card.style.transform = `translateX(calc(${slideIdx * -280}px + ${slideIdx * -2}rem))`
    })
  }, [slideIdx])

  return (
    <section>
      <div className="section-title">
        <h3>Related Products</h3>
      </div>

      <div className="related-products">
        {!loading && !products.length ? (
          <div className="no-products">
            <h3>No related products found</h3>
          </div>
        ) : loading ? (
          Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={`skeleton-card-${i}`} />)
        ) : (
          <div className="products">
            <div className="overlay left" style={{ opacity: slideIdx === 0 ? 0 : 1 }}></div>
            <div
              className="overlay right"
              style={{ opacity: slideIdx === products.length - NUM_CARDS ? 0 : 1 }}
            ></div>

            <div className="navigation">
              <div className="left" style={{ opacity: slideIdx > 0 ? 1 : 0 }}>
                <button onClick={slideLeft}>
                  <IconChevronLeft size={32} />
                </button>
              </div>
              <div
                className="right"
                style={{ opacity: slideIdx < products.length - NUM_CARDS ? 1 : 0 }}
              >
                <button onClick={slideRight}>
                  <IconChevronRight size={32} />
                </button>
              </div>
            </div>

            {products.map((product) => (
              <div key={product.id} className="product-card">
                <div className="img">
                  <img src={product.thumbnail} alt={product.name} />
                </div>
                <div className="star">
                  <IconStar size={18} />
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
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
