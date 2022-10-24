import { useState } from 'react'

export default function SearchQuestions({ submitHandler }) {
  const [searchString, setSearchString] = useState('')

  return (
    <form onSubmit={(e) => submitHandler(e, searchString)}>
      <input
        onChange={(e) => {
          setSearchString(e.target.value)
        }}
        defaultValue={searchString}
        placeholder="Have a question? Search for answers…"
      ></input>
      <button>Search</button>
    </form>
  )
}
