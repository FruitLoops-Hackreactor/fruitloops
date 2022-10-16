import { useContext, useState } from 'react'
import { IconPlus } from '@tabler/icons'
import { AppContext } from '@/App'
import Products from './Products'
import '@/styles/relatedProducts/main.css'
import SkeletonCard from '../SkeletonCard'

// The number of cards to display at a time
const NUM_CARDS = 4

export default function RelatedProducts() {
  const { loading, products, currentProduct, setModalOpen } = useContext(AppContext)
  const [currentId, setCurrentId] = useState(0)
  const handleProductClick = (id) => () => {
    setModalOpen(true)
    setCurrentId(id)
  }

  return (
    <section className="related-products-comparison">
      <Products
        max={NUM_CARDS}
        loading={loading}
        products={products}
        onClick={handleProductClick}
      />

      <div>
        <div className="section-title">
          <h3>Outfit List</h3>
        </div>

        <div className="outfit-list">
          {!loading && !products.length ? (
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
