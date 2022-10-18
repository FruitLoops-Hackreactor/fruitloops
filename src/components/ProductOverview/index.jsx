import { AppContext, getProduct } from '@/App'
import { useContext, useEffect, useState } from 'react'
import ImageGallery from './PO-Components/ImageGallery'
import Description from './PO-Components/Description'
import ProductInformation from './PO-Components/ProductInformation'
import '@/styles/productOverview.css'

export default function ProductOverview() {
  const { products, currentProduct } = useContext(AppContext)
  const [photos, setPhotos] = useState([])
  const [productById, setProductById] = useState({})

  // get the currentProduct
  useEffect(() => {
    if (!currentProduct) return

    const getPhotos = async () => {
      try {
        return getProduct(currentProduct.id)
      } catch (err) {
        console.log(err)
        return []
      }
    }

    getPhotos().then((product) => {
      console.log('these r the styles:', product.styles) // TEMP
      setPhotos(product.styles[0].photos) // NEED TO REFACTOR FOR WHEN SPECIFIC STYLE IS CHOSEN
      // console.log('these r the product:', product)
      setProductById(product)
    })
  }, [currentProduct])

  return (
    <div className="product-overview">
      <div className="main-container">
        <div className="image-gallery">
          <br></br>
          <ImageGallery products={products} currentProduct={currentProduct} photos={photos} />
        </div>
        <div className="product-info">
          <h4>Product Information</h4>
          <ProductInformation product={productById} />
        </div>
      </div>
      <div className="description">
        <h4>Description</h4>
        <Description />
      </div>
    </div>
  )
}
