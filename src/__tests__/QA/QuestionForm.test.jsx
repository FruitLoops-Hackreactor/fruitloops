import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import product from '../mocks/product'
import QuestionForm from '@/components/QA/QuestionForm'

jest.mock('axios', () => ({
  post: jest.fn(),
}))

describe('QA - Question Form', () => {
  it('should render', () => {
    const { queryByTestId } = render(<QuestionForm currentProduct={product} />)
    expect(queryByTestId('question-form')).toBeTruthy()
  })

  it('should accept current product props', () => {
    const { getByText } = render(<QuestionForm currentProduct={product} />)
    const text = `About the ${product.name}`
    expect(getByText(text)).toBeInTheDocument()
  })
})
