// import axios from 'axios'
import Answer from './Answer'

export default function Question({ question, helpfulnessClick }) {
  let { question_body, question_helpfulness, question_id } = question
  let answers = Object.values(question.answers)

  answers = answers.slice(0, 2)

  return (
    <div id="qa-widget">
      <br></br>
      <div>
        <span id="question-title">Q: {question_body}</span>
        <span>Helpful?</span>
        <span>
          <a onClick={(e) => helpfulnessClick(e, question_id)} href="">
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
