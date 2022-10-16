import '@/styles/relatedProducts/skeletonCard.css'

export default function SkeletonCard() {
  return (
    <div className="product-card">
      <div className="img skeleton"></div>
      <div className="info">
        <div className="skeleton skeleton-text" style={{ width: '50%' }}></div>
        <div className="skeleton skeleton-text" style={{ width: '80%', height: '1.5rem' }}></div>
        <div className="skeleton skeleton-text" style={{ width: '50%' }}></div>
        <div className="skeleton skeleton-text" style={{ width: '30%' }}></div>
      </div>
    </div>
  )
}
