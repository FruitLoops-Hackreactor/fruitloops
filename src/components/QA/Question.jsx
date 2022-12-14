import { useStore } from '@/utils/fastContext'
import { useEffect, useState } from 'react'
import axios from 'axios'
import MoreAnswersLink from './MoreAnswersLink'
import Answer from './Answer'
import AnswerForm from './AnswerForm'

export default function Question({ question, helpfulnessClick }) {
  const setModalContent = useStore('modalContent')[1]
  const [currentProduct] = useStore('currentProduct')
  const [answers, setAnswers] = useState([])
  const [moreAnswers, setMoreAnswers] = useState(true)
  const [reported, setReported] = useState(false)
  const [additionalAnswers, setAdditionalAnswers] = useState(0)
  let { question_body, question_helpfulness, question_id } = question

  // create array of all answers sorted by answer helpfulness
  let allAnswers = Object.values(question.answers).sort((ans1, ans2) => {
    if (ans1.helpfulness < ans2.helpfulness) {
      return 1
    } else if (ans1.helpfulness > ans2.helpfulness) {
      return -1
    } else if (ans1.helpfulness === ans2.helpfuless) {
      return 0
    }
  })

  useEffect(() => {
    setAnswers(allAnswers.slice(0, 2 + additionalAnswers))
  }, [additionalAnswers])

  const handleMoreAnswersClick = (event) => {
    event.preventDefault()
    setMoreAnswers(!moreAnswers)
    if (!additionalAnswers) {
      setAdditionalAnswers(allAnswers.length - 2)
    } else {
      setAdditionalAnswers(0)
    }
  }

  const answerHelpfulnessClickHandler = (event, answerId) => {
    event.preventDefault()
    if (!localStorage.answer_id) {
      localStorage.setItem('answer_id', JSON.stringify([]))
    }
    let parsedIds = JSON.parse(localStorage.getItem('answer_id'))
    if (parsedIds.includes(answerId)) {
      return
    }

    axios
      .put(`/qa/answers/${answerId}/helpful`)
      .then((res) => {
        console.log('res', res)
        setAnswers(
          answers.map((answer) => {
            if (answer.id === answerId) {
              answer.helpfulness++
            }
            return answer
          })
        )
        parsedIds.push(answerId)
        localStorage.setItem('answer_id', JSON.stringify(parsedIds))
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const addNewAnswer = (answer) => {
    setAnswers((answers) => [...answers, answer])
  }

  const reportQuestionClickHandler = (questionId) => {
    axios
      .put(`/qa/questions/${questionId}/report`)
      .then((res) => {
        console.log(res)
        setReported(true)
      })
      .catch((err) => console.log(err))
  }

  let reportText = reported ? 'Reported' : 'Report'

  return (
    <div className="question-container">
      <div className="question-title">
        <span id="question-body">Q: {question_body}</span>
        <div className="question-requests">
          <span className="question-helpfulness">
            <span>Helpful?</span>
            <span>
              <button className="link" onClick={(e) => helpfulnessClick(e, question_id)} href="">
                Yes
              </button>
            </span>
            <span>{`(${question_helpfulness})`}</span>
          </span>
          <span>|</span>
          <span>
            <button
              onClick={(event) => {
                event.preventDefault()
                setModalContent(
                  <AnswerForm
                    currentProduct={currentProduct}
                    question={question}
                    addNewAnswer={addNewAnswer}
                  />
                )
              }}
              className="link"
              href=""
            >
              Add Answer
            </button>
          </span>
          <span>|</span>
          <span>
            <button
              onClick={() => {
                reportQuestionClickHandler(question_id)
              }}
              className="link"
              href=""
            >
              {reportText}
            </button>
          </span>
        </div>
      </div>
      <div className="answers-container" data-testid="answers-container">
        {answers.map((answer) => {
          return (
            <Answer
              helpfulnessClick={answerHelpfulnessClickHandler}
              answer={answer}
              key={`A-${answer.id}`}
            />
          )
        })}
        {allAnswers.length > 2 && (
          <MoreAnswersLink moreAnswers={moreAnswers} handleClick={handleMoreAnswersClick} />
        )}
      </div>
    </div>
  )
}
