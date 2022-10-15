import { useState } from 'react'

const Body = (props) => {
  if (props.body.length > 250) {
    return <TruncatedBody body={props.body} />
  }
  return (
    <div>
      <span className="reviewBody">{props.body}</span>
    </div>
  )
}

const TruncatedBody = (props) => {
  // Renamed this to avoid errors and for proper naming conventions
  const [fullBody, setFullBody] = useState(false)
  var showFullBody = () => {
    props.setFullBody(true)
  }

  if (fullBody) {
    return (
      <div>
        <span className="reviewBody">{props.body}</span>
      </div>
    )
  }
  return (
    <div>
      <span className="reviewBody">{props.body.slice(0, 250) + '...'}</span>
      <button onClick={showFullBody}>Show more</button>
    </div>
  )
}

export default Body
