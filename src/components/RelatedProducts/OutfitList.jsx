import { useEffect, useState } from 'react'
import { IconChevronLeft, IconChevronRight, IconPlus } from '@tabler/icons'
import ProductCard from './ProductCard'
import SkeletonCard from '../SkeletonCard'

export default function OutfitList({ max, loading, currentProduct }) {
  max-- // Need to decrement to account for the add to outfit card
  const [outfit, setOutfit] = useState([])
  const [slideIdx, setSlideIdx] = useState(0)
  const slideLeft = () => setSlideIdx((idx) => (idx === 0 ? 0 : idx - 1))
  const slideRight = () => setSlideIdx((idx) => (idx === outfit.length - max ? idx : idx + 1))
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

  /**
   * Handle the carousel. Need to grab all the product cards and shift them
   * by the amount of the slide index times the width of the card plus the
   * margin-right gap.
   */
  useEffect(() => {
    // Prevent the hook from running if there are no products
    if (!outfit.length) return
    // Get all the product cards and the add to outfit card
    const cards = document.querySelectorAll('.your-outfit .product-card, .add-card')
    // Get the width of the card and the margin-right gap, except when the
    // slide index is 0, then just set the translate to 0
    cards.forEach((card) => {
      card.style.transform = `translateX(calc(${slideIdx * -280}px + ${slideIdx * -2}rem))`
    })
  }, [slideIdx])

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
            {outfit.length > max && (
              <>
                <div className="overlay left" style={{ opacity: slideIdx === 0 ? 0 : 1 }} />
                <div
                  className="overlay right"
                  style={{ opacity: slideIdx === outfit.length - max ? 0 : 1 }}
                />

                <div className="navigation">
                  <div className="left" style={{ opacity: slideIdx > 0 ? 1 : 0 }}>
                    <button onClick={slideLeft}>
                      <IconChevronLeft size={32} />
                    </button>
                  </div>
                  <div
                    className="right"
                    style={{ opacity: slideIdx < outfit.length - max ? 1 : 0 }}
                  >
                    <button onClick={slideRight}>
                      <IconChevronRight size={32} />
                    </button>
                  </div>
                </div>
              </>
            )}

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
          </div>
        )}
      </div>
    </div>
  )
}
