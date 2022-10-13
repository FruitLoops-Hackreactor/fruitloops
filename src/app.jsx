import ProudctOverview from './components/ProductOverview'
import RelatedProducts from './components/RelatedProducts'
import QA from './components/QA'
import RatingsReviews from './components/RatingsReviews'

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
