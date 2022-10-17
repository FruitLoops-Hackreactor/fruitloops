import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { IconPlus } from '@tabler/icons'
import { AppContext, getProduct } from '@/App'
import Products from './Products'
import '@/styles/relatedProducts/main.css'
import SkeletonCard from '../SkeletonCard'

export default function RelatedProducts() {
  const { currentProduct, setModalOpen, setModalContent } = useContext(AppContext)
  const [loading, setLoading] = useState(true)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [outfit, setOutfit] = useState([])
  const relProdEl = document.querySelector('.related-products')
  // The max number of cards to display at a time
  const NUM_CARDS = relProdEl?.clientWidth < 1024 ? 2 : relProdEl?.clientWidth < 1280 ? 3 : 4

  console.log(document.querySelector('.related-products'))
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
        currentProduct={currentProduct}
        relatedProducts={relatedProducts}
        setModalOpen={setModalOpen}
        setModalContent={setModalContent}
      />

      <div>
        <div className="section-title">
          <h3>Your Outfit</h3>
        </div>

        <div className="outfit-list">
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={`skeleton-card-${i}`} />)
          ) : (
            <div className="products">
              <div className="add-card">
                <button>
                  <IconPlus size={24} />
                </button>
                <h2>Add to Outfit</h2>
              </div>
              {!outfit.length
                ? null
                : outfit.map((product) => <div className="product-card" key={product.id}></div>)}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
