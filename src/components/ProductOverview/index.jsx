import { useEffect, useState } from 'react'
import { useStore } from '@/utils/fastContext'
import { getProduct } from '@/utils/products'
import ImageGallery from './PO-Components/ImageGallery'
import Description from './PO-Components/Description'
import ProductInformation from './PO-Components/ProductInformation'
import '@/styles/productOverview/main.css'

export default function ProductOverview() {
  const [products] = useStore('products')
  const [currentProduct] = useStore('currentProduct')
  const [photos, setPhotos] = useState([])
  const [productById, setProductById] = useState({})

  // get the currentProduct
  useEffect(() => {
    if (!currentProduct) return

    const getPhotos = async () =>
      getProduct(currentProduct.id).catch((err) => {
        console.error(err)
        return []
      })

    getPhotos().then((product) => {
      // console.log('this is 1 style for the product:', product.styles[0]) // TEMP
      setPhotos(product.styles[0].photos) // NEED TO REFACTOR FOR WHEN SPECIFIC STYLE IS CHOSEN
      console.log('these r the product:', product)
      setProductById(product)
    })
  }, [currentProduct])

  // when user clicks new style, we want image gallery to update
  const changePhotos = (styleObj) => {
    setPhotos(styleObj.photos)
  }

  return (
    <div className="product-overview">
      <div className="main-container">
        <div className="image-gallery">
          <br></br>
          <ImageGallery products={products} currentProduct={currentProduct} photos={photos} />
        </div>
        <div className="product-info">
          <ProductInformation product={productById} changePhotos={changePhotos} />
        </div>
      </div>
      <div className="description">
        <Description product={productById} id={productById.id} />
      </div>
    </div>
  )
}
