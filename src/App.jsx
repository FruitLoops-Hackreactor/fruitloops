import { createContext, useEffect, useState, useRef } from 'react'
import axios from 'axios'
>>>>>>> main
import ProductOverview from './components/ProductOverview'
import RelatedProducts from './components/RelatedProducts'
import QA from './components/QA'
import RatingsReviews from './components/RatingsReviews'

if (!process.env.GITHUB_TOKEN) {
  throw new Error('GITHUB_TOKEN is not defined')
}

// Set the baseURL and header for all requests
axios.defaults.baseURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp'
axios.defaults.headers.common['Authorization'] = process.env.GITHUB_TOKEN

const defaultAppContext = {
  currentProduct: null,
  products: [],
  loading: true,
  setModalOpen: () => null,
}

export const AppContext = createContext(defaultAppContext)

// The number of products to request
const PROD_COUNT = 10

class Product {
  constructor(product) {
    this.id = product.id
    this.name = product.name
    this.slogan = product.slogan
    this.description = product.description
    this.category = product.category
    this.default_price = product.default_price
    this.styles = product.styles.map((style) => ({
      style_id: style.style_id,
      name: style.name,
      photos: style.photos.map((photo) => ({
        thumbnail_url: photo.thumbnail_url,
        url: photo.url,
      })),
    }))
  }
}

const getProducts = async () => {
  try {
    // Get the products from the API
    const products = await axios.get(`/products?count=${PROD_COUNT}`).then((res) => res.data)
    // Map each product with the details and styles
    return await Promise.all(
      products.map(
        async ({ id }) =>
          new Product({
            // Product details
            ...(await axios.get(`/products/${id}`).then((res) => res.data)),
            // Product styles
            styles: await axios.get(`/products/${id}/styles`).then((res) => res.data.results),
          })
      )
    )
  } catch (err) {
    console.error(err)
    return []
  }
}

export default function App() {
  const modalRef = useRef(null)
  const modalOverlayRef = useRef(null)
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState([])
  const [currentProduct, setCurrentProduct] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState(null)

  // TEMP
  console.log('products', products)

  // When clicking the modal overlay, close the modal
  const handleModalClick = (e) => {
    if (e.target === modalOverlayRef.current) {
      setModalOpen(false)
      setModalContent(null)
    }
  }

  // Fetch the products
  useEffect(() => {
    getProducts().then((products) => {
      setLoading(false)
      setProducts(products)
      setCurrentProduct(products.length ? products[0] : null)
    })
  }, [])

  /**
   * Handles the modal. If the modal is open, it will display the modal and overlay.
   * It will also set the overflow property on the body element to prevent scrolling
   * and set the event listener to be able to close the modal.
   */
  useEffect(() => {
    if (!modalRef.current) return

    if (modalOpen) {
      modalRef.current.style.display = 'block'
      document.getElementsByTagName('body')[0].style.overflow = 'hidden'
      window.addEventListener('click', handleModalClick)
    } else {
      modalRef.current.style.display = 'none'
      document.getElementsByTagName('body')[0].style.overflow = 'auto'
      window.removeEventListener('click', handleModalClick)
    }
    // Need to specify the cleanup function to remove the event listener
    return () => window.removeEventListener('click', handleModalClick)
  }, [modalRef, modalOpen])

  return (
    <AppContext.Provider value={{ loading, products, currentProduct }}>
      <main className="container">
        <ProductOverview />
        <div>
          <RelatedProducts />
          <QA />
          <RatingsReviews />
        </div>
      </main>
    </AppContext.Provider>
>>>>>>> main
  )
}
