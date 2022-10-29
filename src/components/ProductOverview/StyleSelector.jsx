import { useState, useEffect } from 'react'
import axios from 'axios'
import '@/styles/productOverview/styleSelector.css'

export default function StyleSelector({ product, id, skusHandler, changePhotos, setSalePrice }) {
  const [styles, setStyles] = useState([])
  const [currentStyle, setCurrentStyle] = useState({})
  const [currentIndex, setCurrentIndex] = useState(0)

  // helper function for when user clicks a new style
  const handleStyleClick = (styleId, index) => {
    // returns an array form of the styleObj, filtered based on id property
    const filteredStyle = styles.filter((style) => style.style_id === styleId)
    // transform the data structure into an object
    const selectedStyle = { ...filteredStyle[0] }
    // change the relevant state items
    setCurrentStyle(selectedStyle)
    // change photos in the imageGallery component
    changePhotos(selectedStyle)
    // pass back up sale price information to productInformation component
    setSalePrice(selectedStyle.sale_price)
    // change sku information for addToCart component
    skusHandler(selectedStyle.skus)
    // helpful for the conditional rendering below
    setCurrentIndex(index)
  }

  useEffect(() => {
    // if there is no id, do nothing
    if (!id) return
    // set the current style to be the default style received from the api, otherwise do the first style
    const defaultStyle = product.styles.find((style) => style.default) || product.styles[0]
    setCurrentStyle(defaultStyle)

    // make a sepearate get request because our product prop doesn't have sku information
    axios
      .get(`/products/${id}/styles`)
      .then((styleObj) => {
        // set state for all the styles (array of objs)
        setStyles(styleObj.data.results)
        // destructure sale price property and change state
        const { sale_price } = defaultStyle
        setSalePrice(sale_price)
        // filter the received data based on the default style property
        const defaultSkus = styleObj?.data?.results?.filter(
          (style) => style.style_id === defaultStyle.style_id
        )
        // destructure the sku information
        const { skus } = defaultSkus[0]
        // set the skus to be the skus from the default style
        skusHandler(skus)
      })
      .catch((err) => console.log(err))
  }, [id])

  return (
    <div className="style-container">
      <div className="style-heading">
        <b>STYLE &gt;</b> {currentStyle.name}
      </div>
      <div className="bubble-container">
        {styles?.map((style, index) => {
          return (
            <div
              className={index === currentIndex ? 'bubble active' : 'bubble'}
              onClick={() => handleStyleClick(style.style_id, index)}
              key={index}
              role="button"
              tabIndex={0}
              onKeyDown={() => handleStyleClick(style.style_id, index)}
            >
              <img className="style-bubble" src={style.photos[0].thumbnail_url} alt={style.name} />
              {index === currentIndex && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-check bubble-check"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M5 12l5 5l10 -10"></path>
                </svg>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
