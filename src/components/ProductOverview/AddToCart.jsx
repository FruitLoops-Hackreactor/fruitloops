import { useState } from 'react'
import '@/styles/productOverview/addToCart.css'

export default function AddToCart({ skus }) {
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(0)
  const [errorMsg, setErrorMsg] = useState(false)
  const [successMsg, setSuccessMsg] = useState(false)

  const getSizeAndQuantity = () => {
    // if there are no skus, do nothing
    if (skus.length === 0) return
    // map over the sku objects, and return the size and quantity properties
    const sizeAndQuantity = Object.keys(skus).map((sku) => {
      return skus[sku]
    })
    // returns an array of objs
    return sizeAndQuantity
  }

  const getQuantity = (sizeStr) => {
    if (sizeStr) {
      // get sizeAndQuantity via helper function, returns an array
      const sqArray = getSizeAndQuantity()
      // for a certain sku, retrieve the quantity for the user selected size
      const quantityPerSize = sqArray.filter((sqObj) => sqObj.size === sizeStr)
      // return the relevant quantity for the sku selected
      return quantityPerSize[0].quantity
    }
    return
  }

  const numDropdown = () => {
    // get the total number (N) of quantity per size
    const totalQuantity = getQuantity(selectedSize)
    // create an array from 1 to N [1, 2, 3, ...N]
    const stock = Array.from({ length: totalQuantity }, (v, i) => i + 1)
    // map over the stock array
    return stock?.map((num, index) => {
      return (
        <option className="qty-options" value={num} key={index}>
          {num}
        </option>
      )
    })
  }

  const checkout = () => {
    // if user hasn't selected a size or quantity
    if (!selectedSize || !quantity) {
      // conditional render an error msg
      setErrorMsg(true)
      // remove the success msg on the page if it exists
      setSuccessMsg(false)
      // reset dropdown menu
      setSelectedSize('')
      setQuantity(0)
      // if user has selected a valid cart
    } else if (selectedSize && quantity) {
      // remove the error msg on the page if it exists
      setErrorMsg(false)
      // conditional render a success msg
      setSuccessMsg(true)
      // reset dropdown menu
      setSelectedSize('')
      setQuantity(0)
    }
  }

  return (
    <>
      <div className="conditional-error-msg">
        {errorMsg && (
          <div className="notification-error-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-exclamation-mark exclamation-mark"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 19v.01" />
              <path d="M12 15v-10" />
            </svg>

            <div className="notification-body-error">Please select a size and quantity.</div>
            <div className="error-space"></div>
            <button className="close-notification" onClick={() => setErrorMsg(false)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-x x-symbol"
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
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
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
        </div>

        <div className="conditional-success-msg">
          {successMsg && (
            <div className="notification-success">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-check check-mark"
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
              <div className="notification-body-success">Successfully added to cart</div>
              <div className="error-space"></div>
              <button className="close-notification" onClick={() => setSuccessMsg(false)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-x x-symbol"
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
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
