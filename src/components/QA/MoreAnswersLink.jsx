export default function MoreAnswersLink({ moreAnswers, handleClick }) {
  let link = moreAnswers ? (
    <a onClick={(e) => handleClick(e)} id="more-answers" href="">
      See More Answers
    </a>
  ) : (
    <></>
  )
  return link
}
