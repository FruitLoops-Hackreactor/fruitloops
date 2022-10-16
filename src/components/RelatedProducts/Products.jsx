import { useState, useEffect } from 'react'
import { IconChevronLeft, IconChevronRight, IconStar } from '@tabler/icons'
import SkeletonCard from '../SkeletonCard'

export default function Products({ max, loading, products, onClick }) {
  const [slideIdx, setSlideIdx] = useState(0)
  const slideLeft = () => setSlideIdx((idx) => (idx === 0 ? 0 : idx - 1))
  const slideRight = () => setSlideIdx((idx) => (idx === products.length - max ? idx : idx + 1))

  /**
   * Handle the carousel. Need to grab all the product cards and shift them
   * by the amount of the slide index times the width of the card plus the
   * margin-right gap.
   */
  useEffect(() => {
    // Prevent the hook from running if there are no products
    if (!products.length) return

    const cards = document.querySelectorAll('.related-products .product-card')

    cards.forEach((card) => {
      // Get the width of the card and the margin-right gap, except when the
      // slide index is 0, then just set the translate to 0
      card.style.transform = `translateX(calc(${slideIdx * -280}px + ${slideIdx * -2}rem))`
    })
  }, [slideIdx])

  return (
    <div>
      <div className="section-title">
        <h3>Related Products</h3>
      </div>

      <div className="related-products">
        {!loading && !products.length ? (
          <div className="no-products">
            <h3>No related products found</h3>
          </div>
        ) : loading ? (
          Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={`skeleton-card-${i}`} />)
        ) : (
          <div className="products">
            <div className="overlay left" style={{ opacity: slideIdx === 0 ? 0 : 1 }}></div>
            <div
              className="overlay right"
              style={{ opacity: slideIdx === products.length - max ? 0 : 1 }}
            ></div>

            <div className="navigation">
              <div className="left" style={{ opacity: slideIdx > 0 ? 1 : 0 }}>
                <button onClick={slideLeft}>
                  <IconChevronLeft size={32} />
                </button>
              </div>
              <div className="right" style={{ opacity: slideIdx < products.length - max ? 1 : 0 }}>
                <button onClick={slideRight}>
                  <IconChevronRight size={32} />
                </button>
              </div>
            </div>

            {products.map((product) => (
              <div key={product.id} className="product-card" onClick={onClick(product.id)}>
                <div className="img">
                  <img src={product.styles[0].photos[0].thumbnail_url} alt={product.name} />
                </div>
                <div className="star">
                  <IconStar size={18} />
                </div>
                <div className="info">
                  <div>
                    <h4>{product.category}</h4>
                  </div>
                  <div>
                    <h3 className="product-name">{product.name}</h3>
                  </div>
                  <div>
                    <h4>${product.default_price}</h4>
                  </div>
                  <div>
                    <h4>Ratings</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
