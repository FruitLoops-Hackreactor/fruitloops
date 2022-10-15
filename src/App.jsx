import ProudctOverview from './components/ProductOverview'
import RelatedProducts from './components/RelatedProducts'
import QA from './components/QA'
import RatingsReviews from './components/RatingsReviews'
import axios from 'axios'

if (!process.env.GITHUB_TOKEN) {
  throw new Error('GITHUB_TOKEN is not defined')
}

// Set the baseURL and header for all requests
axios.defaults.baseURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp'
axios.defaults.headers.common['Authorization'] = process.env.GITHUB_TOKEN

export default function App() {
  return (
    <main className="container">
      <ProudctOverview />
      <div>
        <RelatedProducts />
        <QA />
        <RatingsReviews />
      </div>
    </main>
  )
}
