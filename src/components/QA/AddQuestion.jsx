import { useStore } from '@/utils/fastContext'
import QuestionForm from './QuestionForm'

export default function AddQuestion() {
  const setModalContent = useStore('modalContent')[1]
  const [currentProduct] = useStore('currentProduct')

  return (
    <button
      onClick={() => setModalContent(<QuestionForm currentProduct={currentProduct} />)}
      id="add-question"
    >
      ADD A QUESTION
    </button>
  )
}
