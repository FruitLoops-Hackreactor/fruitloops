import { useState, useEffect } from 'react'

export default function Carousel({ group, max, children, type }) {
  children = !children.length ? [] : children.filter(Boolean)
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

    const cards = document.querySelectorAll(`#${group}.carousel-items`)
    // Get the width of the card and the margin-right gap, except when the
    // slide index is 0, then just set the translate to 0
    cards.forEach((card) => {
      card.style.transform = `translateX(calc(${slideIdx * -280}px + ${slideIdx * -2}rem))`
    })
  }, [slideIdx])

  // Don't display the carousel if the number of products is less than the max
  if (children.length < max && type !== 'outfit') return children

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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-chevron-left"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <polyline points="15 6 9 12 15 18" />
              </svg>
            </button>
          </div>
          <div className="right" style={{ opacity: slideIdx < children.length - max ? 1 : 0 }}>
            <button onClick={slideRight}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-chevron-right"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <polyline points="9 6 15 12 9 18" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div id={group} className="carousel-items">
        {children}
      </div>
    </div>
  )
}
