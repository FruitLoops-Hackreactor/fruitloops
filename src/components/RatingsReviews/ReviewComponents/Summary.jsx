import React from 'react'

const Summary = (props) => {
  var truncateSummary = (summary) => {
    if (summary.length > 60) {
      return summary.slice(0, 60)
    } else {
      return summary
    }
  }

  return (
    <div>
      <span className="reviewSummary">
        <b>{truncateSummary(props.summary)}</b>
      </span>
    </div>
  )
}

export default Summary
