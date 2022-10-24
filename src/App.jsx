import { useEffect } from 'react'
import axios from 'axios'
import { useStore } from './utils/fastContext'
import { getProducts } from './utils/products'
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

      const id = window.location.pathname.split('/')[1]
      // Check for product id param, if none, set the first product as the current product
      if (!id) {
        setCurrentProduct(products[0])
        // Otherwise, set the product with the matching id as the current product
      } else {
        const idx = products.findIndex((prod) => prod.id === Number(id))
        setCurrentProduct(products[idx])
      }
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
