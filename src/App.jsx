import { createContext, useEffect, useState } from 'react'
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
}

export const AppContext = createContext(defaultAppContext)

// The number of products to request
const PROD_COUNT = 10
// Slight delay to show the skeleton cards and give a loading effect
const FETCH_DELAY = 1500

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
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState([])
  const [currentProduct, setCurrentProduct] = useState(null)

  console.log('products', products)

  // Fetch the products
  useEffect(() => {
    getProducts().then((products) => {
      setTimeout(() => {
        setLoading(false)
        setProducts(products)
      }, FETCH_DELAY)
    })
  }, [])

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
  )
}
