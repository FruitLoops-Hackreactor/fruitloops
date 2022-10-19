import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import '@/styles/productOverview/styleSelector.css'
import { IconCheck } from '@tabler/icons'

export default function StyleSelector({ product, id }) {
  const [styles, setStyles] = useState([])
  const [currentStyle, setCurrentStyle] = useState({})
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleStyleClick = (index) => {
    console.log('this is the style that was clicked', index)
    setCurrentStyle(styles[index])
    setCurrentIndex(index)
  }

  useEffect(() => {
    if (!product) return

    axios
      .get(`/products/${id}/styles`)
      .then((styleObj) => {
        setStyles(styleObj.data.results)
        setCurrentStyle(styleObj.data.results[0]) // the first style
        console.log('results array in styles:', styleObj.data.results)
        console.log('currentStyle:', styleObj.data.results[0])
      })
      .catch((err) => console.log(err))
  }, [id])

  return (
    <div className="style-container">
      <div className="style-heading space">STYLE &gt; {currentStyle.name}</div>
      <div className="bubble-container space">
        {styles?.map((style, index) => {
          return (
            <div
              className={index === currentIndex ? 'bubble active' : 'bubble'}
              onClick={() => handleStyleClick(index)}
              key={index}
            >
              <img className="style-bubble" src={style.photos[0].thumbnail_url} alt={style.name} />
              {index === currentIndex && <IconCheck className="bubble-check" />}
            </div>
          )
        })}
      </div>
    </div>
  )
}
