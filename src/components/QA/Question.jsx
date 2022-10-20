import { useStore } from '@/utils/fastContext'
import Answer from './Answer'
import AnswerForm from './AnswerForm'

export default function Question({ question, helpfulnessClick }) {
  const setModalContent = useStore('modalContent')[1]
  const [currentProduct] = useStore('currentProduct')
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
        <span>
          <a
            onClick={(event) => {
              event.preventDefault()
              setModalContent(<AnswerForm currentProduct={currentProduct} question={question} />)
            }}
            href=""
          >
            Add Answer
          </a>
        </span>
      </div>
      <div>
        {answers.map((answer, index) => {
          return <Answer answer={answer} key={index} />
        })}
      </div>
    </div>
  )
}
