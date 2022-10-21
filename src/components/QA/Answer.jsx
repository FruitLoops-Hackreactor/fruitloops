const Answer = ({ answer }) => {
  let { answerer_name, body } = answer

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  let date = formatDate(answer.date)
  console.log('answer', answer)

  return (
    <div>
      <span>{`A: `}</span>
      <span>{body}</span>
      <div className="answer-thumbnails">
        {answer.photos.map((photo) => {
          return <img src={`${photo}`} height="160" />
        })}
      </div>
      <p id="answer-info">by {`${answerer_name}, ${date}`}</p>
    </div>
  )
}

export default Answer
