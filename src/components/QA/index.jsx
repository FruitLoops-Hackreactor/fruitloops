import Question from './Question'
import axios from 'axios'
import { useState, useEffect } from 'react'

export default function QA() {
  let [questions, setQuestions] = useState([])

  useEffect(() => {
    axios
      .get('/qa/questions', {
        params: {
          product_id: 40343,
        },
      })
      .then((res) => {
        setQuestions(res.data.results)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  // Added this so you can view the data results in the console
  console.log('questions', questions)

  return (
    <section>
      <h3>QUESTIONS & ANSWERS</h3>
      <div className="questions-list">
        {questions.map((question, index) => {
          return <Question question={question} key={index} />
        })}
      </div>
    </section>
  )
}
