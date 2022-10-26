import { useState } from 'react'
import { IconExclamationMark, IconX, IconCheck } from '@tabler/icons'
import '@/styles/productOverview/addToCart.css'

export default function AddToCart({ skus }) {
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(0)
  const [errorMsg, setErrorMsg] = useState(false)
  const [successMsg, setSuccessMsg] = useState(false)

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

  const checkout = () => {
    if (!selectedSize || !quantity) {
      setErrorMsg(true)
      setSuccessMsg(false)
      setSelectedSize('')
      setQuantity(0)
    } else if (selectedSize && quantity) {
      setErrorMsg(false)
      setSuccessMsg(true)
      setSelectedSize('')
      setQuantity(0)
    }
  }

  return (
    <>
      <div className="conditional-error-msg">
        {errorMsg && (
          <div className="notification-error-container">
            <IconExclamationMark className="exclamation-mark" />
            <div className="notification-body-error">Please select a size and quantity.</div>
            <div className="error-space"></div>
            <button className="close-notification" onClick={() => setErrorMsg(false)}>
              <IconX className="x-symbol" />
            </button>
          </div>
        )}
        <div />
        <div className="atc-container">
          <select
            value={selectedSize}
            className="select-size"
            onChange={(event) => setSelectedSize(event.target.value)}
          >
            <option value="">SELECT SIZE</option>
            {getSizeAndQuantity(skus)?.map((sku, index) => (
              <option className="size-options" value={sku.size} key={index}>
                {sku.size}
              </option>
            ))}
          </select>

          <select
            className="select-qty"
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
          >
            {getQuantity(selectedSize) > 0 ? (
              <>
                <option value="">SELECT QTY</option>
                {numDropdown()}
              </>
            ) : getQuantity(selectedSize) === 0 ? (
              <option value="">OUT OF STOCK</option>
            ) : (
              <option value="">SELECT QTY</option>
            )}
          </select>

          <button className="add-to-bag" aria-label="cart" onClick={() => checkout()}>
            ADD TO BAG
          </button>
          {/* <IconStar className="icon-star" /> */}
        </div>

        <div className="conditional-success-msg">
          {successMsg && (
            <div className="notification-success">
              <IconCheck className="check-mark" />
              <div className="notification-body-success">Successfully added to cart</div>
              <div className="error-space"></div>
              <button className="close-notification" onClick={() => setSuccessMsg(false)}>
                <IconX className="x-symbol" />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
