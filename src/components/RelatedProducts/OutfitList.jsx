import { useEffect, useState } from 'react'
import Carousel from './Carousel'
import ProductCard from './ProductCard'
import SkeletonCard from '../SkeletonCard'

export default function OutfitList({ max, loading, currentProduct }) {
  max-- // Need to decrement to account for the add to outfit card
  const [outfit, setOutfit] = useState([])
  const addItem = () => {
    if (!outfit.find((product) => product.id === currentProduct.id)) {
      setOutfit((currOutfit) => {
        const newOutfit = [...currOutfit, currentProduct]
        localStorage.setItem('outfit', JSON.stringify(newOutfit))
        return newOutfit
      })
    }
  }
  const removeItem = (id) => {
    setOutfit((currOutfit) => {
      const newOutfit = currOutfit.filter((product) => product.id !== id)
      localStorage.setItem('outfit', JSON.stringify(newOutfit))
      return newOutfit
    })
  }

  /**
   * Load the outfit from local storage
   */
  useEffect(() => {
    try {
      const item = localStorage.getItem('outfit')
      const parsed = JSON.parse(item)

      if (parsed) {
        setOutfit(parsed)
      }
    } catch (err) {
      console.error('Failed to parse outfit from local storage: \n' + String(item))
      setOutfit([])
    }
  }, [])

  return (
    <div className="your-outfit">
      <div className="section-title">
        <h3>Your Outfit</h3>
      </div>

      <div className="outfit-list">
        {loading ? (
          // Add to length to account for the add to outfit card from decrementing max
          Array.from({ length: max + 1 }).map((_, i) => <SkeletonCard key={`skeleton-card-${i}`} />)
        ) : (
          <div className="items-container">
            {/* Only render slider if there are more than the number of cards to display at once */}
            <Carousel group="outfit-carousel" max={max} type="outfit">
              <div className="add-card">
                <button onClick={addItem}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-plus"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </button>
                <h2>Add to Outfit</h2>
              </div>

              {!outfit.length
                ? null
                : outfit.map((product) => (
                    <ProductCard
                      key={'outfit-' + product.id}
                      product={product}
                      action="remove"
                      actionHandler={removeItem}
                    />
                  ))}
            </Carousel>
          </div>
        )}
      </div>
    </div>
  )
}
