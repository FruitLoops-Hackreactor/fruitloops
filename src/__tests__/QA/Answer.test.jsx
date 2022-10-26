import { render } from '@testing-library/react'
import Question from '@/components/QA/Question'

jest.mock('axios', () => ({
  get: jest.fn(),
}))

jest.mock('@/utils/fastContext', () => ({
  useStore: jest.fn(() => [jest.fn(), jest.fn()]),
}))

describe('multiple answers', () => {
  const question = JSON.parse(
    `{"question_id":354849,"question_body":"Modi sunt et et tenetur vel repellendus commodi.","question_date":"2021-02-03T00:00:00.000Z","asker_name":"Elwyn34","question_helpfulness":22,"reported":false,"answers":{"3318581":{"id":3318581,"body":"Sint aut voluptas ipsam.","date":"2021-01-24T00:00:00.000Z","answerer_name":"Diamond.Schiller","helpfulness":5,"photos":[]},"3318582":{"id":3318582,"body":"Blanditiis dolores at optio voluptatum deserunt iusto voluptates aut eius.","date":"2021-02-11T00:00:00.000Z","answerer_name":"Stacy_Kemmer21","helpfulness":14,"photos":[]},"3318583":{"id":3318583,"body":"Culpa tempore nisi natus eos omnis velit.","date":"2020-10-13T00:00:00.000Z","answerer_name":"Kirstin.OKeefe","helpfulness":12,"photos":["https://images.unsplash.com/photo-1553830591-2f39e38a013c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2760&q=80","https://images.unsplash.com/photo-1511499008188-de491bbbae98?ixlib=rb-1.2.1&auto=format&fit=crop&w=988&q=80"]}}}`
  )

  it('should display only two answers and the more answer link if there are more than two answers', () => {
    const { queryByTestId } = render(<Question question={question} />)

    expect(queryByTestId('answers-container').children).toHaveLength(3)
  })
})
