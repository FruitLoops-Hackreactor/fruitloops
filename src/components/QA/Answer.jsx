const Answer = ({ answer, helpfulnessClick }) => {
  let { answerer_name, body, id: answer_id } = answer

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  let date = formatDate(answer.date)

  return (
    <div className="answer">
      <span>{`A: `}</span>
      <span>{body}</span>
      <div className="answer-thumbnails">
        {answer.photos.map((photo, index) => {
          return <img src={`${photo}`} height="160" key={`I-${index}`} />
        })}
      </div>
      <div className="answer-info">
        <span>by {`${answerer_name}, ${date}`}</span>
        <span>Helpful?</span>
        <a onClick={(e) => helpfulnessClick(e, answer_id)} href="">
          Yes
        </a>
        <span className="answer-helpfulness">{`(${answer.helpfulness})`}</span>
      </div>
    </div>
  )
}

export default Answer
