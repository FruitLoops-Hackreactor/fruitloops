import '@/styles/productOverview/description.css'

export default function Description({ product }) {
  if (!product) return

  const listItems = product?.features?.map((feature, index) =>
    feature.value ? (
      <div className="li-container" key={index}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-check"
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
        <li>{`${feature.feature}: ${feature.value}`}</li>
      </div>
    ) : (
      <div key={index}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-check"
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
        <li>{`${feature.feature}`}</li>
      </div>
    )
  )

  return (
    <div className="description-container" data-testid="description-test">
      <div className="desc-title">Product Description</div>
      <div className="slogan">{product.slogan}</div>
      <div className="desc-summary">{product.description}</div>
      <ul className="features fa-ul">
        {listItems}
        <div className="li-container2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-check"
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
          <li>
            <div className="li-text">Imported</div>
          </li>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-check"
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
          <li>Returns are accepted on this product</li>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-check"
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
          <li>
            <div className="li-text">Model is wearing size L in tops & size M in bottoms</div>
          </li>
        </div>
      </ul>
    </div>
  )
}
