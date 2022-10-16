import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { IconPlus } from '@tabler/icons'
import { AppContext, getProduct } from '@/App'
import Products from './Products'
import '@/styles/relatedProducts/main.css'
import SkeletonCard from '../SkeletonCard'

// The number of cards to display at a time
const NUM_CARDS = 4

export default function RelatedProducts() {
  const { currentProduct, setModalOpen, setModalContent } = useContext(AppContext)
  const [loading, setLoading] = useState(true)
  const [relatedProducts, setRelatedProducts] = useState([])
  const handleProductClick = (id) => () => {
    const product = products.find((product) => product.id === id)

    setModalOpen(true)
    setModalContent(
      <div className="product-comparison">
        <div className="title">
          <span>comparing</span>
        </div>
        <div className="product-names">
          <span>{currentProduct.name}</span>
          <span>{product.name}</span>
        </div>
        <div className="comparison"></div>
      </div>
    )
  }

  // Get the related products
  useEffect(() => {
    if (!currentProduct) return

    const getRelatedProducts = async () => {
      try {
        // Get the related products id's from the API
        const productIds = await axios
          .get(`/products/${currentProduct.id}/related`)
          .then((res) => res.data)
        // Map each product with the details and styles
        return await Promise.all(productIds.map((id) => getProduct(id)))
      } catch (err) {
        console.error(err)
        return []
      }
    }

    getRelatedProducts().then((products) => {
      setLoading(false)
      setRelatedProducts(products)
    })
  }, [currentProduct])

  return (
    <section className="related-products-comparison">
      <Products
        max={NUM_CARDS}
        loading={loading}
        products={relatedProducts}
        onClick={handleProductClick}
      />

      <div>
        <div className="section-title">
          <h3>Outfit List</h3>
        </div>

        <div className="outfit-list">
          {!loading && !relatedProducts.length ? (
            <div className="no-products">
              <h3>No related products found</h3>
            </div>
          ) : loading ? (
            Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={`skeleton-card-${i}`} />)
          ) : (
            <div className="products">
              <div className="add-card">
                <button>
                  <IconPlus size={24} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
