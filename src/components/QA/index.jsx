import Question from './Question'
import MoreQuestionsBtn from './MoreQuestionsBtn'
import axios from 'axios'
import { useState, useEffect, useContext } from 'react'
import { AppContext } from '@/App'

export default function QA() {
  let [questions, setQuestions] = useState([])
  let [allQuestions, setAllQuestions] = useState([])
  let [moreQuestions, setMoreQuestions] = useState(true)
  let { currentProduct } = useContext(AppContext)
  let [additionalQuestions, setAdditionalQuestions] = useState()
  console.log('currentProduct', currentProduct)

  useEffect(() => {
    if (!currentProduct) return

    axios
      .get('/qa/questions', {
        params: {
          product_id: 40343,
        },
      })
      .then((res) => {
        setAllQuestions(res.data.results)
        setAdditionalQuestions(0)
        return res.data.results
      })
      .then((res) => {
        if (res.length <= 4) {
          setMoreQuestions(false)
        } else {
          setMoreQuestions(true)
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }, [currentProduct])

  useEffect(() => {
    setQuestions(allQuestions.slice(0, 4 + additionalQuestions))
  }, [additionalQuestions])

  const handleMoreQuestionsClick = () => {
    if (allQuestions.length <= 4 + additionalQuestions + 2) {
      setMoreQuestions(false)
    }
    setAdditionalQuestions(additionalQuestions + 2)
  }
  // Added this so you can view the data results in the console
  console.log('questions', questions)

  return (
    <section>
      <h3 className="section-title">QUESTIONS & ANSWERS</h3>
      <div className="questions-list">
        {questions.map((question, index) => {
          return <Question question={question} key={index} />
        })}
      </div>
      <span>
        <MoreQuestionsBtn moreQuestions={moreQuestions} handleClick={handleMoreQuestionsClick} />
      </span>
    </section>
  )
}
