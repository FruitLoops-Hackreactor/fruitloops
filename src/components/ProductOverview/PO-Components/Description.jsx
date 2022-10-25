import '@/styles/productOverview/description.css'

export default function Description({ product }) {
  if (!product) return
  // useEffect(() => {
  //   if (!product) return
  // }, [product])

  const listItems = product?.features?.map((feature, index) =>
    feature.value ? (
      <li key={index}>{`${feature.feature}: ${feature.value}`}</li>
    ) : (
      <li key={index}>{`${feature.feature}`}</li>
    )
  )

  return (
    <div className="description-container">
      <div className="slogan">{product.slogan}</div>
      <div className="desc-title">PRODUCT DETAILS</div>
      <div className="desc-summary">{product.description}</div>
      <ul className="features">
        {listItems}
        <li>Imported</li>
        <li>Returns are accepted on this product</li>
      </ul>
    </div>
  )
}
