import axios from 'axios'
import { useState } from 'react'

export default function AnswerForm({ currentProduct, question }) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [answerBody, setAnswerBody] = useState('')

  const emailRegex =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
  const { question_id, question_body: questionBody } = question

  const answerSubmitHandler = (event) => {
    event.preventDefault()

    if (!email || !answerBody || !username) {
      let values = [
        ['Email', email],
        ['Answer', answerBody],
        ['Nickname', username],
      ]
      let falsyValues = values
        .filter((value) => !value[1])
        .map((value) => value[0])
        .join(', ')
      alert(`You must enter the following: ${falsyValues}`)
      return
    }
    if (!emailRegex.test(email)) {
      alert('You must enter the following: Valid email address')
      return
    }
    let answer = {
      body: answerBody,
      name: username,
      email: email,
      // TEMP: replace with array of user supplied photos
      photos: [],
    }
    axios
      .post(`/qa/questions/${question_id}/answers`, answer)
      .then((res) => console.log('new answer post response', res))
      .catch((err) => console.log(err))
  }

  return (
    <form onSubmit={(e) => answerSubmitHandler(e)}>
      <h3>Submit your Answer</h3>
      <h5>{`${currentProduct.name}: ${questionBody}`}</h5>
      <div className="input-group">
        <span>*Nickname</span>
        <input
          onChange={(e) => setUsername(e.target.value)}
          defaultValue={username}
          type="text"
          placeholder="Example: jack543!"
        ></input>
        <span>For privacy reasons, do not use your full name or email address</span>
      </div>
      <div className="input-group">
        <span>*Email</span>
        <input
          onChange={(e) => setEmail(e.target.value)}
          defaultValue={email}
          type="text"
          placeholder="Example: jack@email.com"
          className="answer-form-email"
          maxLength="60"
        ></input>
        <span>For authentication reasons, you will not be emailed</span>
      </div>
      <div className="input-group">
        <span>*Answer</span>
        <textarea
          onChange={(e) => setAnswerBody(e.target.value)}
          defaultValue={answerBody}
          className="answer-form-body"
          maxLength="1000"
        ></textarea>
      </div>
      <input type="file"></input>
      <button type="submit">Submit</button>
    </form>
  )
}
