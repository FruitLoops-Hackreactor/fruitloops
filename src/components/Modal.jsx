import { useRef, useEffect } from 'react'
import { useStore } from '@/utils/fastContext'

export default function Modal() {
  const modalRef = useRef(null)
  const modalOverlayRef = useRef(null)
  const [modalContent, setModalContent] = useStore('modalContent')
  // When clicking the modal overlay, close the modal
  const handleModalClick = (e) => {
    if (e.target === modalOverlayRef.current) {
      setModalContent(null)
    }
  }

  /**
   * Handles the modal. If the modal is open, it will display the modal and overlay.
   * It will also set the overflow property on the body element to prevent scrolling
   * and set the event listener to be able to close the modal.
   */
  useEffect(() => {
    if (!modalRef.current) return

    if (modalContent) {
      modalRef.current.style.display = 'block'
      // Set the modal to the current scroll position to always be in view and centered
      modalRef.current.style.top = window.scrollY + 'px'
      document.getElementsByTagName('body')[0].style.overflow = 'hidden'
      window.addEventListener('click', handleModalClick)
    } else {
      modalRef.current.style.display = 'none'
      document.getElementsByTagName('body')[0].style.overflow = 'auto'
      window.removeEventListener('click', handleModalClick)
    }
    // Need to specify the cleanup function to remove the event listener
    return () => window.removeEventListener('click', handleModalClick)
  }, [modalRef, modalContent])

  return (
    <div ref={modalRef} className="modal" data-testid="modal">
      <div ref={modalOverlayRef} className="modal-overlay" data-testid="modal-overlay">
        <div className="modal-content" data-testid="modal-content">
          {modalContent}
        </div>
      </div>
    </div>
  )
}
