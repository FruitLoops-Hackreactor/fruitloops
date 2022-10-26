import { fireEvent, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import product from '../mocks/product'
import AnswerForm from '@/components/QA/AnswerForm'
import axios from 'axios'

global.cloudinary = { createUploadWidget: jest.fn(() => null) }

jest.mock('axios', () => ({
  post: jest.fn(() => Promise.reject(jest.fn())),
}))

describe('QA - Answer Form', () => {
  const question = JSON.parse(
    `{"question_id":328983,"question_body":"Est autem aut voluptas amet quibusdam omnis.","question_date":"2021-05-19T00:00:00.000Z","asker_name":"Leopoldo46","question_helpfulness":22,"reported":false,"answers":{"3073651":{"id":3073651,"body":"Aliquam vero quis excepturi.","date":"2021-03-09T00:00:00.000Z","answerer_name":"Alba.Dooley","helpfulness":16,"photos":[]}}}`
  )

  it('should render', () => {
    render(<AnswerForm currentProduct={product} question={question} />)
    expect(document.querySelector('form')).toBeTruthy()
  })

  it('should accept current product props', () => {
    const { getByText } = render(<AnswerForm currentProduct={product} question={question} />)
    const text = `${product.name}: ${question.question_body}`
    expect(getByText(text)).toBeInTheDocument()
  })

  it('should trigger submit event handler', () => {
    const { getByTestId } = render(<AnswerForm currentProduct={product} question={question} />)

    const email = getByTestId('email')
    const answerBody = getByTestId('answer-body')
    const username = getByTestId('username')
    const emailValue = 'jamanning35@gmail.com'
    const answerBodyValue = 'Lawrence is bullying my code. In a good way ;)'
    const usernameValue = 'PinTheKnight'

    fireEvent.change(email, { target: { value: emailValue } })
    fireEvent.change(answerBody, { target: { value: answerBodyValue } })
    fireEvent.change(username, { target: { value: usernameValue } })

    fireEvent.submit(document.querySelector('form'))

    expect(axios.post).toHaveBeenCalledTimes(1)
  })
})
