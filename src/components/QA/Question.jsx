// import axios from 'axios'
import Answer from './Answer'
import '../../styles/qa.css'

export default function Question({ question }) {
  let { question_body, question_helpfulness } = question
  let answers = Object.values(question.answers)

  answers = answers.slice(0, 2)

  const helpfulnessClickHandler = (event) => {
    event.preventDefault()
    console.log('Hello')
  }

  return (
    <div id="qa-widget">
      <br></br>
      <div>
        <span id="question-title">Q: {question_body}</span>
        <span>Helpful?</span>
        <span>
          <a onClick={(e) => helpfulnessClickHandler(e)} href="">
            Yes
          </a>
        </span>
        <span>{`(${question_helpfulness})`}</span>
      </div>
      <div>
        {answers.map((answer, index) => {
          return <Answer answer={answer} key={index} />
        })}
      </div>
    </div>
  )
}
