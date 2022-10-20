import { useEffect, useState } from 'react'
import axios from 'axios'
import { useStore } from '@/utils/fastContext'
import ReviewsList from './ReviewsList'

export default function RatingsReviews() {
  const [currentProduct] = useStore('currentProduct')
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
      <h3 className="section-title">RATINGS AND REVIEWS</h3>
      <ReviewsList reviews={reviews} />
    </section>
  )
}
