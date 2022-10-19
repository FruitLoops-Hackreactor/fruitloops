export default function AnswerForm({ currentProduct, questionBody }) {
  console.log(currentProduct)
  return (
    <form>
      <h3>Submit your Answer</h3>
      <h5>{`${currentProduct.name}: ${questionBody}`}</h5>
      <input></input>
      <input></input>
      <input></input>
      <button type="submit">Submit</button>
    </form>
  )
}
