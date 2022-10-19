import { screen, render } from '@testing-library/react'
import QuestionsList from '@/components/QA/QuestionsList'

describe('individual question', () => {
  const questions = [
    JSON.parse(
      `{"question_id":328983,"question_body":"Est autem aut voluptas amet quibusdam omnis.","question_date":"2021-05-19T00:00:00.000Z","asker_name":"Leopoldo46","question_helpfulness":22,"reported":false,"answers":{"3073651":{"id":3073651,"body":"Aliquam vero quis excepturi.","date":"2021-03-09T00:00:00.000Z","answerer_name":"Alba.Dooley","helpfulness":16,"photos":[]}}}`
    ),
  ]

  it('should display one question if there is one question', () => {
    render(<QuestionsList questions={questions} />)

    expect(screen.queryByTestId('questions-list').children.length).toBe(1)
  })
})
