import '@/styles/productOverview/description.css'

export default function Description({ product }) {
  if (!product) return

  const listItems = product?.features?.map((feature, index) =>
    feature.value ? (
      <li key={index}>
        <span class="fa-li">
          <i class="fa-sharp fa-solid fa-check"></i>
        </span>
        {`${feature.feature}: ${feature.value}`}
      </li>
    ) : (
      <li key={index}>
        <span class="fa-li">
          <i class="fa-sharp fa-solid fa-check"></i>
        </span>
        {`${feature.feature}`}
      </li>
    )
  )

  return (
    <div className="description-container">
      <div className="desc-title">Product Description</div>
      <div className="slogan">{product.slogan}</div>
      <div className="desc-summary">{product.description}</div>
      <ul class="features fa-ul">
        {listItems}
        <li>
          <span class="fa-li">
            <i class="fa-sharp fa-solid fa-check"></i>
          </span>
          Imported
        </li>
        <li>
          <span class="fa-li">
            <i class="fa-sharp fa-solid fa-check"></i>
          </span>
          Returns are accepted on this product
        </li>
        <li>
          <span class="fa-li">
            <i class="fa-sharp fa-solid fa-check"></i>
          </span>
          Model is wearing size L in tops & size M in bottoms
        </li>
      </ul>
    </div>
  )
}
