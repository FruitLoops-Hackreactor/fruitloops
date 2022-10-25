import { IconStar, IconX } from '@tabler/icons'
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
    <div
      ref={cardRef}
      key={product.id}
      className="product-card"
      onClick={handleCardClick}
      data-testid="product-card"
    >
      <div className="img">
        <img src={product.styles[0].photos[0].thumbnail_url} alt={product.name} />
      </div>
      <div ref={actionRef} className="action">
        {action === 'compare' ? (
          <IconStar size={24} color="gold" fill="gold" />
        ) : action === 'remove' ? (
          <IconX size={28} color="black" />
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
    </div>
  )
}
