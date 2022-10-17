import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { AppContext, getProduct } from '@/App'
import Products from './Products'
import OutfitList from './OutfitList'
import '@/styles/relatedProducts/main.css'

export default function RelatedProducts() {
  const { currentProduct, setModalOpen, setModalContent } = useContext(AppContext)
  const [loading, setLoading] = useState(true)
  const [relatedProducts, setRelatedProducts] = useState([])
  const relProdEl = document.querySelector('.related-products')
  // The max number of cards to display at a time
  const NUM_CARDS = relProdEl?.clientWidth < 1024 ? 2 : relProdEl?.clientWidth < 1280 ? 3 : 4

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

      <OutfitList max={NUM_CARDS} loading={loading} currentProduct={currentProduct} />
    </section>
  )
}
