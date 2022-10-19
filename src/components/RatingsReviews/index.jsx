import { useContext, useEffect, useState} from 'react'
import { AppContext } from '@/App'
import ReviewsList from './ReviewsList'
import axios from 'axios'

export default function RatingsReviews() {
  const { currentProduct } = useContext(AppContext)
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    if (!currentProduct) return
    axios
      .get('/reviews', {
        params: {
          product_id: currentProduct.id,
        },
      })
      .then((res) => {
        setReviews(res.data.results)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [currentProduct])

  return (
    <section>
      <h3 className='section-title'>RATINGS AND REVIEWS</h3>
      <ReviewsList reviews={reviews} />
    </section>
  )
}
