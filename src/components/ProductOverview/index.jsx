import { useEffect, useState } from 'react'
import { useStore } from '@/utils/fastContext'
import ImageGallery from './ImageGallery'
import ProductInformation from './ProductInformation'
import '@/styles/productOverview/main.css'

export default function ProductOverview() {
  const [currentProduct] = useStore('currentProduct')
  const [photos, setPhotos] = useState([])
  const [expand, setExpand] = useState(false)
  const [slideIdx, setSlideIdx] = useState(0)

  useEffect(() => {
    // if there is no current product, do nothing
    if (!currentProduct) return

    // otherwise, retrieve the default style filtering by the default property, default to the first style if it does not exist
    const defaultStyle =
      currentProduct.styles.find((style) => style.default) || currentProduct.styles[0]
    // set the photos for the default style in display, to be changed later
    setPhotos(defaultStyle.photos)
  }, [currentProduct])

  // when user clicks new style, update imageGallery component
  const changePhotos = (styleObj) => {
    setPhotos(styleObj.photos)
    // edge case - if user was on photo #4 when viewing style N, reset them back to the first photo
    setSlideIdx(0)
  }

  return (
    <section className="product-overview">
      <h4 className="banner" data-testid="banner-test">
        <span className="banner-sub-1">BEST PRICE GUARANTEE</span>
        <span className="banner-sub-2 banner-padding">
          If you find a lower price, we&apos;ll match it.
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
    </section>
  )
}
