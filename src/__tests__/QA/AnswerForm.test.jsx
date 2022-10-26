import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import product from '../mocks/product'
import AnswerForm from '@/components/QA/AnswerForm'

global.cloudinary = { createUploadWidget: jest.fn(() => null) }

jest.mock('axios', () => ({
  post: jest.fn(),
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
    render(<AnswerForm currentProduct={product} />)
    const text = `${currentProduct.name}: ${question.question_body}`
    expect(document.querySelector(text)).toBeInTheDocument()
  })
})
