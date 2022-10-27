import { useStore } from '@/utils/fastContext'
import QuestionForm from './QuestionForm'

export default function AddQuestion() {
  const setModalContent = useStore('modalContent')[1]

  return (
    <button onClick={() => setModalContent(<QuestionForm />)} id="add-question">
      ADD A QUESTION +
    </button>
  )
}
