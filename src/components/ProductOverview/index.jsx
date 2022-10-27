import { useEffect, useState } from 'react'
import { useStore } from '@/utils/fastContext'
import ImageGallery from './PO-Components/ImageGallery'
import ProductInformation from './PO-Components/ProductInformation'
import '@/styles/productOverview/main.css'

export default function ProductOverview() {
  const [currentProduct] = useStore('currentProduct')
  const [photos, setPhotos] = useState([])
  const [expand, setExpand] = useState(false)
  const [slideIdx, setSlideIdx] = useState(0)

  // get the currentProduct
  useEffect(() => {
    if (!currentProduct) return
    // console.log('this is the currentProduct', currentProduct)

    // console.log('this is the currentProduct from store', currentProduct)
    const defaultStyle =
      currentProduct.styles.find((style) => style.default) || currentProduct.styles[0]
    // console.log('this is the photos from store', defaultStyle)
    setPhotos(defaultStyle.photos)
  }, [currentProduct])

  // when user clicks new style, we want image gallery to update
  const changePhotos = (styleObj) => {
    // const newProd = product.find((prod) => prod.id === id)
    setPhotos(styleObj.photos)
    setSlideIdx(0)
  }

  return (
    <section className="product-overview">
      <h4 className="banner" data-testid="banner-test">
        <span className="banner-sub-1">BEST PRICE GUARANTEE</span>
        <span className="banner-sub-2 banner-padding">
          If you find a lower price, we'll match it.
        </span>
        <span className="banner-sub-3 banner-padding">
          <b>FREE</b> shipping on all orders over $100
          <span className="banner-sub-2 banner-padding">(continental US only)</span>
        </span>
      </h4>
      <div className="main-container">
        <div className="image-gallery">
          <ImageGallery
            photos={photos}
            expand={expand}
            setExpand={setExpand}
            slideIdx={slideIdx}
            setSlideIdx={setSlideIdx}
          />
        </div>
        <div className="product-info">
          <ProductInformation
            product={currentProduct}
            changePhotos={changePhotos}
            expand={expand}
          />
        </div>
      </div>
      {/* <div className="description">
        <Description product={currentProduct} />
      </div> */}
    </section>
  )
}
