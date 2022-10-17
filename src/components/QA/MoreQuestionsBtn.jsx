export default function MoreQuestionsBtn({ moreQuestions, handleClick }) {
  let button = moreQuestions ? (
    <button onClick={() => handleClick()} id="more-questions">
      MORE ANSWERED QUESTIONS
    </button>
  ) : (
    <></>
  )
  return button
}
