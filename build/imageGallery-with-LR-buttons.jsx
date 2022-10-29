import '/src/styles/productOverview/imageGallery.css'
import PrismaZoom from 'react-prismazoom'

export default function ImageGallery({ photos, expand, setExpand, slideIdx, setSlideIdx }) {
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

  return (
    <div className="image-gallery-container">
      <div className="container-squares">
        {slideIdx !== 0 ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-chevron-up up-arrow up"
            onClick={prevSlide}
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
            <polyline points="6 15 12 9 18 15"></polyline>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="invisible-up-arrow"
            onClick={prevSlide}
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
            <polyline points="6 15 12 9 18 15"></polyline>
          </svg>
        )}
        {photos?.map((photo, index) => {
          if (!photo.thumbnail_url) {
            ;<div className="square" onMouseEnter={() => moveDot(index)} key={index}></div>
          } else {
            return (
              <div
                className={index === slideIdx ? 'square active' : 'square'}
                onClick={() => moveDot(index)}
                key={index}
                role="button"
                tabIndex={0}
                onKeyDown={() => moveDot(index)}
              >
                <img src={photo.thumbnail_url} alt={photo.name} className="snippit" />
                {index === slideIdx && <div className="highlight"></div>}
              </div>
            )
          }
        })}
        {length && slideIdx !== length - 1 ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-chevron-down down-arrow down"
            onClick={nextSlide}
            data-testid="toggle-vertical-carousel"
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
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        ) : (
          <div></div>
        )}
      </div>

      <div className={expand === false ? 'carousel' : 'carousel-expanded'}>
        {/* left arrow clickHandler */}
        {/* {slideIdx !== 0 ? <IconChevronLeft className="left-arrow" onClick={prevSlide} /> : null} */}
        {/*  */}
        {photos?.map((photo, index) => {
          if (!photo.thumbnail_url) {
            return (
              <div className="photo-null" key={index}>
                No photo(s) at this time. Please check again later.
              </div>
            )
          } else {
            return (
              <div className="app-image" key={index}>
                <PrismaZoom maxZoom={3} scrollVelocity={0.2}>
                  <div className={index === slideIdx ? 'slide active' : 'slide'}>
                    {index === slideIdx && (
                      <img
                        src={photo.thumbnail_url}
                        alt={photo.name}
                        className={expand === false ? 'image' : 'expanded-image'}
                        data-testid="image-test"
                      />
                    )}
                  </div>
                </PrismaZoom>
              </div>
            )
          }
        })}
        {/* right arrow clickHandler */}
        {/* {slideIdx !== length - 1 ? (
          <IconChevronRight className="right-arrow" onClick={nextSlide} />
        ) : null} */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-maximize expand-button"
          onClick={() => setExpand(!expand)}
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
          <path d="M4 8v-2a2 2 0 0 1 2 -2h2"></path>
          <path d="M4 16v2a2 2 0 0 0 2 2h2"></path>
          <path d="M16 4h2a2 2 0 0 1 2 2v2"></path>
          <path d="M16 20h2a2 2 0 0 0 2 -2v-2"></path>
        </svg>
      </div>
    </div>
  )
}
