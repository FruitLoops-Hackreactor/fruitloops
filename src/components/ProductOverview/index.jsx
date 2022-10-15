import SearchBar from './SearchBar'
import '../../styles/productOverview.css'

export default function ProductOverview() {
  return (
    <section>
      <div className="navbar">
        <SearchBar />
      </div>
      <div className="image-gallery">
        <h4>Image Gallery</h4>
      </div>
      <div className="product-info">
        <h4>Product Information</h4>
      </div>
      <div className="style-selector">
        <h4>Style Selector</h4>
      </div>
      <div className="add-to-cart">
        <h4>Add to Cart</h4>
      </div>
      <div className="description">
        <h4>Description</h4>
      </div>
    </section>
  )
}
