import { useEffect } from 'react'
import axios from 'axios'
import { useStore } from './utils/fastContext'
import { getProduct } from './utils/products'
import Modal from './components/Modal'
import SearchBar from './components/SearchBar'
import ProductOverview from './components/ProductOverview'
import RelatedProducts from './components/RelatedProducts'
import QA from './components/QA'

if (!process.env.GITHUB_TOKEN) {
  throw new Error('GITHUB_TOKEN is not defined')
}

// Set the baseURL and header for all requests
axios.defaults.baseURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp'
axios.defaults.headers.common['Authorization'] = process.env.GITHUB_TOKEN

// The default product id to load
const MAIN_PROD_ID = 40344

export default function App() {
  const setLoading = useStore('loading')[1]
  const setCurrentProduct = useStore('currentProduct')[1]

  // Fetch the products
  useEffect(() => {
    const id = window.location.pathname.split('/')[1]

    getProduct(id || MAIN_PROD_ID).then((product) => {
      setLoading(false)
      setCurrentProduct(product)
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
        </div>
      </main>
    </>
  )
}
