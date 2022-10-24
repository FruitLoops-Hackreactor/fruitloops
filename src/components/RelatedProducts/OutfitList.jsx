import { useEffect, useState } from 'react'
import { IconPlus } from '@tabler/icons'
import Carousel from './Carousel'
import ProductCard from './ProductCard'
import SkeletonCard from '../SkeletonCard'

export default function OutfitList({ max, loading, currentProduct }) {
  max-- // Need to decrement to account for the add to outfit card
  const [outfit, setOutfit] = useState([])
  const addItem = () => {
    if (!outfit.find((product) => product.id === currentProduct.id)) {
      setOutfit((currOutfit) => [...currOutfit, currentProduct])
    }
  }
  const removeItem = (id) => () => {
    setOutfit((currOutfit) => currOutfit.filter((product) => product.id !== id))
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

  /**
   * Save the outfit to local storage when it changes
   */
  useEffect(() => {
    localStorage.setItem('outfit', JSON.stringify(outfit))
  }, [outfit])

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
            <Carousel group="outfit-carousel" max={max}>
              <div className="add-card">
                <button onClick={addItem}>
                  <IconPlus size={24} />
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
