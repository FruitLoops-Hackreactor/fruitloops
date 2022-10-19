import { useContext } from 'react'
import { AppContext } from '@/App'
import QuestionForm from './QuestionForm'

export default function AddQuestion() {
  const { setModalOpen, setModalContent, currentProduct } = useContext(AppContext)

  return (
    <button
      onClick={() => {
        setModalOpen(true)
        setModalContent(<QuestionForm currentProduct={currentProduct} />)
      }}
      id="add-question"
    >
      ADD A QUESTION +
    </button>
  )
}
