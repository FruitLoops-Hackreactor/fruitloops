import { useState, useEffect } from 'react'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons'

export default function Carousel({ max, children }) {
  const [slideIdx, setSlideIdx] = useState(0)
  const slideLeft = () => setSlideIdx((idx) => (idx === 0 ? 0 : idx - 1))
  const slideRight = () => setSlideIdx((idx) => (idx === children.length - max ? idx : idx + 1))

  /**
   * Handle the carousel. Need to grab all the product cards and shift them
   * by the amount of the slide index times the width of the card plus the
   * margin-right gap.
   */
  useEffect(() => {
    // Prevent the hook from running if there are no products
    if (!children.length) return

    const cards = document.querySelectorAll('.carousel-items')
    // Get the width of the card and the margin-right gap, except when the
    // slide index is 0, then just set the translate to 0
    cards.forEach((card) => {
      card.style.transform = `translateX(calc(${slideIdx * -280}px + ${slideIdx * -2}rem))`
    })
  }, [slideIdx])

  return (
    <div className="carousel">
      <div className="carousel-nav">
        <div className="overlay left" style={{ opacity: slideIdx === 0 ? 0 : 1 }} />
        <div
          className="overlay right"
          style={{ opacity: slideIdx === children.length - max ? 0 : 1 }}
        />

        <div className="navigation">
          <div className="left" style={{ opacity: slideIdx > 0 ? 1 : 0 }}>
            <button onClick={slideLeft}>
              <IconChevronLeft size={32} />
            </button>
          </div>
          <div className="right" style={{ opacity: slideIdx < children.length - max ? 1 : 0 }}>
            <button onClick={slideRight}>
              <IconChevronRight size={32} />
            </button>
          </div>
        </div>
      </div>

      <div className="carousel-items">{children}</div>
    </div>
  )
}
