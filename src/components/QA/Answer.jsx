import { useState } from 'react'

const Answer = ({ answer, helpfulnessClick, reportClick }) => {
  let { answerer_name, body, id: answer_id } = answer
  const [reported, setReported] = useState(false)

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  let date = formatDate(answer.date)

  const clickHandler = (event) => {
    event.preventDefault()
    reportClick(event, answer_id)
    setReported(true)
  }

  let reportText = reported ? 'Reported' : 'Report'

  return (
    <div className="answer">
      <div className="answer-body">
        <span id="answer-tag">{`A: `}</span>
        <span className="answer-body-text">{body}</span>
      </div>
      <div className="answer-thumbnails">
        {answer.photos.map((photo, index) => {
          return (
            <img
              src={`${photo}`}
              height="160"
              key={`I-${index}`}
              alt={`uploaded by ${answerer_name}`}
            />
          )
        })}
      </div>
      <div className="answer-info">
        <span>by {`${answerer_name}, ${date}`}</span>
        <span>|</span>
        <span className="answer-helpfulness">
          <span>Helpful?</span>
          <button className="link" onClick={(e) => helpfulnessClick(e, answer_id)} href="">
            Yes
          </button>
          <span>{`(${answer.helpfulness})`}</span>
        </span>
        <span>|</span>
        <button
          onClick={(e) => {
            clickHandler(e)
          }}
          className="link"
          href=""
        >
          {reportText}
        </button>
      </div>
    </div>
  )
}

export default Answer
