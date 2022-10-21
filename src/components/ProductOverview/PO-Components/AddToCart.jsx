import { useState } from 'react'
import { IconStar, IconPlus } from '@tabler/icons'

export default function AddToCart({ skus }) {
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(0)

  const getSizeAndQuantity = () => {
    if (skus.length === 0) return
    const sizeAndQuantity = Object.keys(skus).map((sku) => {
      return skus[sku]
    })
    // console.log('this is sizeAndQuantity', sizeAndQuantity)
    return sizeAndQuantity
  }

  const getQuantity = (sizeStr) => {
    if (sizeStr) {
      const sqArray = getSizeAndQuantity()
      const quantityPerSize = sqArray.filter((sqObj) => sqObj.size === sizeStr)
      // console.log(quantityPerSize[0].quantity)
      return quantityPerSize[0].quantity
    }
    return
  }

  const numDropdown = () => {
    // get the total number (N) of quantity per size
    const totalQuantity = getQuantity(selectedSize)
    // create an array from 1 to N [1, 2, 3, ...N]
    const stock = Array.from({ length: totalQuantity }, (v, i) => i + 1)
    // console.log('this is stock', stock)
    // map over the stock array
    return stock?.map((num, index) => {
      // console.log('this is num', num)
      return (
        <option className="qty-options" value={num} key={index}>
          {num}
        </option>
      )
    })
  }

  return (
    <div className="atc-container">
      {/* <button type="submit" onClick={getSizeAndQuantity}>
        Check
      </button> */}
      <select className="size" onChange={(event) => setSelectedSize(event.target.value)}>
        <option value="">SELECT SIZE</option>
        {getSizeAndQuantity(skus)?.map((sku, index) => (
          <option className="size-options" value={sku.size} key={index}>
            {sku.size}
          </option>
        ))}
      </select>

      <select className="qty" onChange={(event) => setQuantity(event.target.value)}>
        {getQuantity(selectedSize) > 0 ? (
          <>
            <option value="">SELECT QTY</option>
            {numDropdown()}
          </>
        ) : getQuantity(selectedSize) === 0 ? null : (
          <option value="">SELECT QTY</option>
        )}
      </select>

      <button className="add-to-bag">
        ADD TO BAG <IconPlus className="icon-plus" />
      </button>
      <IconStar className="icon-star" />
    </div>
  )
}
