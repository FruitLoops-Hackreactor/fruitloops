import { useEffect } from 'react'
import axios from 'axios'
import { useStore } from './utils/fastContext'
import { getProducts } from './utils/products'
import Modal from './components/Modal'
import SearchBar from './components/SearchBar'
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

// The number of products to request
const PROD_COUNT = 10

export default function App() {
  const setLoading = useStore('loading')[1]
  const setProducts = useStore('products')[1]
  const setCurrentProduct = useStore('currentProduct')[1]

  // Fetch the products
  useEffect(() => {
    getProducts(PROD_COUNT).then((products) => {
      setLoading(false)
      setProducts(products)
      setCurrentProduct(products.length ? products[0] : null)
    })
  }, [])

  return (
    <>
      <Modal />
      <SearchBar />

      <main className="container">
        <ProductOverview />
        <div>
          <RelatedProducts />
          <QA />
          <RatingsReviews />
        </div>
      </main>
    </>
  )
}
