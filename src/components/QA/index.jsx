import { useState, useEffect } from 'react'
import axios from 'axios'
import { useStore } from '@/utils/fastContext'
import SearchQuestions from './SearchQuestions'
import QuestionsList from './QuestionsList'
import MoreQuestionsBtn from './MoreQuestionsBtn'
import AddQuestion from './AddQuestion'
import '@/styles/qa.css'

export default function QA() {
  const [currentProduct] = useStore('currentProduct')
  let [questions, setQuestions] = useState([])
  let [allQuestions, setAllQuestions] = useState([])
  let [moreQuestions, setMoreQuestions] = useState(true)
  let [additionalQuestions, setAdditionalQuestions] = useState()
  let [searchedQuestions, setSearchedQuestions] = useState([])

  useEffect(() => {
    if (!currentProduct) return

    axios
      .get('/qa/questions', {
        params: {
          product_id: currentProduct.id,
        },
      })
      .then((res) => {
        setAllQuestions(res.data.results)
        setSearchedQuestions(res.data.results)
        setAdditionalQuestions(0)
        if (res.data.results.length <= 4) {
          setMoreQuestions(false)
        } else {
          setMoreQuestions(true)
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }, [currentProduct])

  /*
   * render filtered questions when user submits a search, add questions when more
   * questions button is clicked
   */
  useEffect(() => {
    setQuestions(searchedQuestions.slice(0, 4 + additionalQuestions))
  }, [searchedQuestions, additionalQuestions])

  /*
   * check if all questions will be displayed, if so, set moreQuestion state to false
   * and display up to 2 more questions
   */
  const handleMoreQuestionsClick = () => {
    if (allQuestions.length <= 4 + additionalQuestions + 2) {
      setMoreQuestions(false)
    }
    setAdditionalQuestions(additionalQuestions + 2)
  }

  /*
   * updates helpfulness value of question on API, uses localStorage to make
   * sure only once per user per question
   */
  const helpfulnessClickHandler = (event, questionId) => {
    event.preventDefault()
    if (!localStorage.question_id) {
      localStorage.setItem('question_id', JSON.stringify([]))
    }
    let parsedIds = JSON.parse(localStorage.getItem('question_id'))
    if (parsedIds.includes(questionId)) {
      return
    }

    axios
      .put(`/qa/questions/${questionId}/helpful`)
      .then((res) => {
        console.log('res', res)
        setQuestions(
          questions.map((question) => {
            if (question.question_id === questionId) {
              question.question_helpfulness++
            }
            return question
          })
        )
        parsedIds.push(questionId)
        localStorage.setItem('question_id', JSON.stringify(parsedIds))
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const searchQuestionsChangeHandler = (event) => {
    if (event.target.value.length >= 3) {
      setSearchedQuestions(
        allQuestions.filter((question) =>
          question.question_body.toLowerCase().includes(event.target.value.toLowerCase())
        )
      )
    } else {
      setSearchedQuestions(allQuestions)
    }
  }

  return (
    <section id="qa-widget">
      <div className="section-title">
        <h3>QUESTIONS & ANSWERS</h3>
      </div>
      <SearchQuestions changeHandler={searchQuestionsChangeHandler} />
      <QuestionsList questions={questions} helpfulnessClick={helpfulnessClickHandler} />
      <span>
        <MoreQuestionsBtn moreQuestions={moreQuestions} handleClick={handleMoreQuestionsClick} />
        <AddQuestion />
      </span>
    </section>
  )
}
