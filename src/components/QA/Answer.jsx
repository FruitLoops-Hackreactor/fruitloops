const Answer = ({ answer }) => {
  let { answerer_name, body } = answer

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  let date = formatDate(answer.date)

  return (
    <div>
      <br></br>
      <span>A:</span>
      <span>{body}</span>
      <p>by {`${answerer_name}, ${date}`}</p>
    </div>
  )
}

export default Answer
