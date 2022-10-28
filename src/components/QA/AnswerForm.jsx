import axios from 'axios'
import { useStore } from '@/utils/fastContext'
import { useState } from 'react'

export default function AnswerForm({ currentProduct, question, addNewAnswer }) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [answerBody, setAnswerBody] = useState('')
  const [photos, setPhotos] = useState([])
  const [morePhotos, setMorePhotos] = useState(true)
  const setModalContent = useStore('modalContent')[1]
  const [newAnswerId, setNewAnswerId] = useState(0)
  const uploadWidget = cloudinary.createUploadWidget(
    { cloudName: process.env.CLOUD_NAME, uploadPreset: 'fec-upload' },
    (err, res) => {
      if (!err && res && res.event === 'success') {
        console.log('Done! Here is the image info: ', res.info.url)
        setPhotos([...photos, res.info.url])
        if (photos.length >= 4) {
          setMorePhotos(false)
        }
      }
      if (err) {
        console.log(err)
      }
    }
  )

  const emailRegex =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
  const { question_id, question_body: questionBody } = question

  // form submit handler and add photo button click handler
  const answerSubmitHandler = (event) => {
    event.preventDefault()

    if (!email || !answerBody || !username) {
      let values = [
        ['Email', email],
        ['Answer', answerBody],
        ['Nickname', username],
      ]
      let falsyValues = values
        .filter((value) => !value[1])
        .map((value) => value[0])
        .join(', ')
      alert(`You must enter the following: ${falsyValues}`)
      return
    }
    if (!emailRegex.test(email)) {
      alert('You must enter the following: Valid email address')
      return
    }
    let answer = {
      body: answerBody,
      name: username,
      email: email,
      photos: photos,
    }
    axios
      .post(`/qa/questions/${question_id}/answers`, answer)
      .then((res) => {
        setModalContent(null)
        addNewAnswer({
          id: newAnswerId,
          body: answerBody,
          date: new Date(),
          answerer_name: username,
          helpfulness: 0,
          photos: photos,
        })
        setNewAnswerId((prev) => prev++)
        console.log('new answer post response', res)
      })
      .catch((err) => console.log(err))
  }

  const addPhotoClickHandler = () => {
    uploadWidget.open()
  }

  // conditional rendering for thumbnails and the add photo button
  let thumbnails
  if (photos.length) {
    let photosCopy = [...photos]
    thumbnails = (
      <>
        {photosCopy.map((photo, index) => {
          return <img alt="uploaded by you" src={`${photo}`} key={index} height="160"></img>
        })}
      </>
    )
  } else {
    thumbnails = <></>
  }

  let addPhotoBtn
  if (morePhotos) {
    addPhotoBtn = (
      <button
        onClick={() => addPhotoClickHandler()}
        type="button"
        className="answer-form-add-photo"
      >
        Add Photo
      </button>
    )
  } else {
    addPhotoBtn = <></>
  }

  return (
    <form onSubmit={(e) => answerSubmitHandler(e)}>
      <h3>Submit your Answer</h3>
      <h5>{`${currentProduct.name}: ${questionBody}`}</h5>
      <div className="input-group">
        <span>*Nickname</span>
        <input
          onChange={(e) => setUsername(e.target.value)}
          defaultValue={username}
          type="text"
          name="username"
          placeholder="Example: jack543!"
          className="answer-form-username"
          data-testid="username"
        ></input>
        <span className="input-info">
          For privacy reasons, do not use your full name or email address
        </span>
      </div>
      <div className="input-group">
        <span>*Email</span>
        <input
          onChange={(e) => setEmail(e.target.value)}
          defaultValue={email}
          type="text"
          name="email"
          placeholder="Example: jack@email.com"
          className="answer-form-email"
          data-testid="email"
          maxLength="60"
        ></input>
        <span className="input-info">For authentication reasons, you will not be emailed</span>
      </div>
      <div className="input-group">
        <span>*Answer</span>
        <textarea
          onChange={(e) => setAnswerBody(e.target.value)}
          defaultValue={answerBody}
          name="answer-body"
          className="answer-form-body"
          data-testid="answer-body"
          maxLength="1000"
        ></textarea>
      </div>
      {addPhotoBtn}
      <div className="answer-form-photos">{thumbnails}</div>
      <button type="submit">Submit</button>
    </form>
  )
}
