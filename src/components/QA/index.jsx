import Question from './Question'
import MoreQuestionsBtn from './MoreQuestionsBtn'
import AddQuestion from './AddQuestion'
import axios from 'axios'
import { useState, useEffect, useContext } from 'react'
import { AppContext } from '@/App'

export default function QA() {
  let [questions, setQuestions] = useState([])
  let [allQuestions, setAllQuestions] = useState([])
  let [moreQuestions, setMoreQuestions] = useState(true)
  let { currentProduct } = useContext(AppContext)
  let [additionalQuestions, setAdditionalQuestions] = useState()

  useEffect(() => {
    if (!currentProduct) return

    axios
      .get('/qa/questions', {
        params: {
          // hardcoded to product id with good sample questions, change to currentProduct.id
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

  // render additional questions when the additionalQuestion state changes
  useEffect(() => {
    setQuestions(allQuestions.slice(0, 4 + additionalQuestions))
  }, [additionalQuestions])

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
        <AddQuestion />
      </span>
    </section>
  )
}
