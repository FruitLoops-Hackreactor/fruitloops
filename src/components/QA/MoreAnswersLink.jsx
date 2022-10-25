export default function MoreAnswersLink({ moreAnswers, handleClick }) {
  let link = moreAnswers ? (
    <a onClick={(e) => handleClick(e)} className="more-answers" href="">
      See More Answers
    </a>
  ) : (
    <a onClick={(e) => handleClick(e)} className="collapse-answers" href="">
      Collapse Answers
    </a>
  )
  return link
}
