import { createContext, useEffect, useState, useRef } from 'react'
import axios from 'axios'
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
  modalOpen: false,
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
    // Get each product with the details
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

  console.log('products', products)

  // When clicking the modal overlay, close the modal
  const handleModalClick = (e) => {
    if (e.target === modalOverlayRef.current) {
      setModalOpen(false)
    }
  }

  // Fetch the products
  useEffect(() => {
    getProducts().then((products) => {
      setLoading(false)
      setProducts(products)
      setCurrentProduct(products[0])
    })
  }, [])

  // Handle the modal
  useEffect(() => {
    if (!modalRef.current) return

    if (modalOpen) {
      modalRef.current.style.display = 'block'
      window.addEventListener('click', handleModalClick)
    } else {
      modalRef.current.style.display = 'none'
      window.removeEventListener('click', handleModalClick)
    }
    // Need to specify the cleanup function to remove the event listener
    return () => window.removeEventListener('click', handleModalClick)
  }, [modalRef, modalOpen])

  return (
    <AppContext.Provider value={{ loading, products, currentProduct, modalOpen, setModalOpen }}>
      <div ref={modalRef} className="modal">
        <div ref={modalOverlayRef} className="modal-overlay" />
        <div className="modal-content">
          <h1 style={{ textAlign: 'center' }}>Yo, i'm a modal</h1>
        </div>
      </div>

      <main className="container">
        <ProductOverview />
        <div>
          <RelatedProducts />
          <QA />
          <RatingsReviews />
        </div>
      </main>
    </AppContext.Provider>
  )
}
