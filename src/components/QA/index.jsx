import Question from './Question'
import axios from 'axios'
import { useState, useEffect, useContext } from 'react'
import { AppContext } from '@/App'

export default function QA() {
  let [questions, setQuestions] = useState([])
  let { currentProduct } = useContext(AppContext)
  let [additionalQuestions, setAdditionalQuestions] = useState()
  console.log('currentProduct', currentProduct)

  useEffect(() => {
    if (!currentProduct) return

    axios
      .get('/qa/questions', {
        params: {
          product_id: currentProduct.id,
        },
      })
      .then((res) => {
        setQuestions(res.data.results)
        setAdditionalQuestions(0)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [currentProduct])

  useEffect(() => {
    setQuestions(questions.slice(0, 4 + additionalQuestions))
  }, [additionalQuestions])
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
    </section>
  )
}
