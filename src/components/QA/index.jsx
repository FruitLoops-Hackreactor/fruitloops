import Question from './Question'
import axios from 'axios'
import { useState, useEffect } from 'react'

export default function QA() {
  let [questions, setQuestions] = useState([])

  useEffect(() => {
    axios
      .get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions', {
        headers: {
          Authorization: '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',
        },
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
