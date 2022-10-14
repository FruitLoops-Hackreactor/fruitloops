import axios from 'axios'
import Answer from './Answer'

const Question = ({ question }) => {
  let {
    question_body,
  } = question
  let answers = []

  for (let [id, answer] of Object.entries(question.answers)) {
    answers.push(answer);
  }

  answers = answers.slice(0, 2)

  console.log('question', question)
  console.log('answers', question.answers)

  return (
    <div>
      <div>
        <p>Q: {question_body}</p>
      </div>
      <div>
        {answers.map((answer, index) => {
          return <Answer answer={answer} key={index} />
        })}
      </div>
    </div>
  )
}

export default Question
