export default function SearchQuestions({ changeHandler }) {
  return (
    <input
      onChange={(e) => {
        changeHandler(e)
      }}
      defaultValue={''}
      placeholder="Have a question? Search for answers…"
      className="search-bar"
    ></input>
  )
}
