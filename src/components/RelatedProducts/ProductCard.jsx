import { useRef } from 'react'

export default function ProductCard({ product, onProductClick, action, actionHandler }) {
  const cardRef = useRef(null)
  const actionRef = useRef(null)
  const defaultStyle = product.styles.find((style) => style.default) || product.styles[0]
  const { sale_price } = defaultStyle
  const handleCardClick = (e) => {
    if (e.target === actionRef.current || actionRef.current.contains(e.target)) {
      actionHandler(product.id)
    } else {
      onProductClick()
    }
  }

  return (
    <button
      ref={cardRef}
      key={product.id}
      className="product-card"
      onClick={handleCardClick}
      onKeyDown={handleCardClick}
    >
      <div className="img">
        <img src={product.styles[0].photos[0].thumbnail_url} alt={product.name} />
      </div>
      <div ref={actionRef} className="action">
        {action === 'compare' ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-star"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="gold"
            fill="gold"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
          </svg>
        ) : action === 'remove' ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-x"
            width="28"
            height="28"
            viewBox="0 0 28 28"
            strokeWidth="2"
            stroke="black"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : null}
      </div>
      <div className="info">
        <div>
          <span>{product.category}</span>
        </div>
        <div>
          <span className="product-name">{product.name}</span>
        </div>
        <div>
          {!sale_price ? (
            <span>${product.default_price}</span>
          ) : (
            <span>
              <span className="sale-price">${sale_price}</span>
              <span className="original-price">${product.default_price}</span>
            </span>
          )}
        </div>
      </div>
    </button>
  )
}
