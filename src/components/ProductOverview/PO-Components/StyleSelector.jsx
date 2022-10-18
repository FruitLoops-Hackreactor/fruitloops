import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import '@/styles/productOverview/styleSelector.css'

export default function StyleSelector({ product, id }) {
  const [styles, setStyles] = useState([])
  const [currentStyle, setCurrentStyle] = useState({})

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
      <div className="style-heading">STYLE &gt; {currentStyle.name}</div>
      {styles?.map((style, index) => (
        <img className="style-bubble" key={index} src={style.photos[0].thumbnail_url} />
      ))}
    </div>
  )
}
