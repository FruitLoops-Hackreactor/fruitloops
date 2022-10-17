import { IconStar } from '@tabler/icons'

export default function ProductCard({ product, actionHandler }) {
  console.log(product)
  const defaultStyle = product.styles.find((style) => style.default) || product.styles[0]
  const { sale_price } = defaultStyle

  return (
    <div key={product.id} className="product-card">
      <div className="img">
        <img src={product.styles[0].photos[0].thumbnail_url} alt={product.name} />
      </div>
      <div className="star" onClick={actionHandler(product.id)}>
        <IconStar size={24} fill="gold" stroke="gold" />
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
        <div>
          <span>Ratings</span>
        </div>
      </div>
    </div>
  )
}
