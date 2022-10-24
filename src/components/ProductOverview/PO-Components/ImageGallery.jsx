import { useState, useEffect } from 'react'
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronDown,
  IconChevronUp,
  IconMaximize,
} from '@tabler/icons'
import '/src/styles/productOverview/imageGallery.css'

export default function ImageGallery({ photos }) {
  const [slideIdx, setSlideIdx] = useState(0)
  const length = photos.length

  // given the current index, if the index reaches the max, reset the index back to 0, otherwise increment upwards
  const nextSlide = () => {
    setSlideIdx((idx) => (idx === length - 1 ? 0 : idx + 1))
  }

  // given the current index, if the index reaches 0, set it at the maximum index, otherwise increment downwards
  const prevSlide = () => {
    setSlideIdx((idx) => (idx === 0 ? length - 1 : idx - 1))
  }

  const moveDot = (idx) => {
    setSlideIdx(idx)
  }

  // console.log(slideIdx) // TEMP

  return (
    <div className="image-gallery-container">
      <div className="container-squares">
        {slideIdx !== 0 ? <IconChevronUp className="up-arrow" onClick={prevSlide} /> : null}
        {photos?.map((photo, index) => {
          return (
            <div
              className={index === slideIdx ? 'square active' : 'square'}
              onClick={() => moveDot(index)}
              key={index}
            >
              <img src={photo.thumbnail_url} alt={photo.name} className="snippit" />
              {index === slideIdx && <div className="highlight"></div>}
            </div>
          )
        })}
        {slideIdx !== length - 1 ? (
          <IconChevronDown className="down-arrow" onClick={nextSlide} />
        ) : null}
      </div>

      <div className="carousel">
        {/* left arrow clickHandler */}
        {slideIdx !== 0 ? <IconChevronLeft className="left-arrow" onClick={prevSlide} /> : null}
        {/*  */}
        {photos?.map((photo, index) => {
          return (
            <div className={index === slideIdx ? 'slide active' : 'slide'} key={index}>
              {index === slideIdx && (
                <img
                  src={photo.thumbnail_url}
                  alt={photo.name}
                  className="image"
                  data-testid="image-test"
                />
              )}
            </div>
          )
        })}
        {/* right arrow clickHandler */}
        {slideIdx !== length - 1 ? (
          <IconChevronRight className="right-arrow" onClick={nextSlide} />
        ) : null}
      </div>
    </div>
  )
}
