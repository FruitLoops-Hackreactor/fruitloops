import { useStore } from '@/utils/fastContext'
import Carousel from './Carousel'
import ProductCard from './ProductCard'
import SkeletonCard from '../SkeletonCard'

export default function Products({ max, loading, currentProduct, relatedProducts }) {
  const setModalContent = useStore('modalContent')[1]
  const currFeatures = !currentProduct
    ? []
    : currentProduct.features.sort((a, b) => a.feature.localeCompare(b.feature))

  /**
   * Get the features of both the current product and the selected product to compare
   * and display common and different features.
   */
  const handleComparisonClick = (id) => () => {
    const product = relatedProducts.find((product) => product.id === id)
    const relFeatures = product.features.sort((a, b) => a.feature.localeCompare(b.feature))
    const features = []
    let i = 0

    for (; i < currFeatures.length; i++) {
      features.push({
        feature: currFeatures[i].feature,
        currentProduct: currFeatures[i].value,
        relatedProduct:
          relFeatures[i].feature === currFeatures[i].feature ? relFeatures[i].value : null,
      })
    }

    for (i = 0; i < relFeatures.length; i++) {
      if (!features.find((feature) => feature.feature === relFeatures[i].feature)) {
        features.push({
          feature: relFeatures[i].feature,
          currentProduct: null,
          relatedProduct: relFeatures[i].value,
        })
      }
    }

    setModalContent(
      <div className="product-comparison">
        <div className="title">
          <span>comparing</span>
        </div>
        <div className="product-names">
          <span>{currentProduct.name}</span>
          <span>{product.name}</span>
        </div>
        <div className="comparison">
          {!features.length ? (
            <h2>No features on both items</h2>
          ) : (
            features.map(({ feature, currentProduct, relatedProduct }) => (
              <div className="row" key={feature}>
                <span>{currentProduct === 'true' ? <IconCheck size={22} /> : currentProduct}</span>
                <span className="feature">{feature}</span>
                <span>{relatedProduct === 'true' ? <IconCheck size={22} /> : relatedProduct}</span>
              </div>
            ))
          )}
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="section-title">
        <h3>Related Products</h3>
      </div>

      <div className="related-products">
        {!loading && !relatedProducts.length ? (
          <div className="no-products">
            <h3>No related products found</h3>
          </div>
        ) : loading ? (
          Array.from({ length: max }).map((_, i) => <SkeletonCard key={`skeleton-card-${i}`} />)
        ) : (
          <div className="products-container">
            {/* Only render slider if there are more than the number of cards to display at once */}
            {relatedProducts.length && (
              <Carousel max={max}>
                {!relatedProducts.length
                  ? null
                  : relatedProducts.map((product) => (
                      <ProductCard
                        key={'related-' + product.id}
                        product={product}
                        action="compare"
                        actionHandler={handleComparisonClick}
                      />
                    ))}
              </Carousel>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
