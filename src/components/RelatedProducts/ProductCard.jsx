import { IconStar, IconX } from '@tabler/icons'

export default function ProductCard({ product, onProductClick, action, actionHandler }) {
  const defaultStyle = product.styles.find((style) => style.default) || product.styles[0]
  const { sale_price } = defaultStyle

  return (
    <div key={product.id} className="product-card" data-testid="product-card">
      <div className="img">
        <img src={product.styles[0].photos[0].thumbnail_url} alt={product.name} />
      </div>
      <div className="action" onClick={actionHandler(product.id)}>
        {action === 'compare' ? (
          <IconStar size={24} color="gold" fill="gold" />
        ) : action === 'remove' ? (
          <IconX size={28} color="black" />
        ) : null}
      </div>
      <div className="info" onClick={onProductClick}>
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
        <div>
          <span>Ratings</span>
        </div>
      </div>
    </div>
  )
}
