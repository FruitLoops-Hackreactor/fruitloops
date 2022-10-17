import { AppContext } from '@/App'
import { useContext } from 'react'
import SearchBar from './PO-Components/SearchBar'
import ImageGallery from './PO-Components/ImageGallery'
import Description from './PO-Components/Description'
import ProductInformation from './PO-Components/ProductInformation'
import '@/styles/productOverview.css'

export default function ProductOverview() {
  const { products, currentProduct } = useContext(AppContext)

  return (
    <div className="product-overview">
      <div className="navbar">
        <SearchBar />
      </div>
      <div className="main-container">
        <div className="image-gallery">
          <br></br>
          <ImageGallery products={products} currentProduct={currentProduct} />
        </div>
        <div className="product-info">
          <h4>Product Information</h4>
          <ProductInformation currentProduct={currentProduct} />
        </div>
      </div>
      <div className="description">
        <h4>Description</h4>
        <Description />
      </div>
    </div>
  )
}
