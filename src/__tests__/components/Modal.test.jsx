import { fireEvent, render } from '@testing-library/react'
import { createFastContext } from '@/utils/fastContext'
import Modal from '@/components/Modal'

describe('Components - Modal', () => {
  let StoreProvider, Wrapper
  const intitialState = {
    modalContent: <></>,
  }

  beforeEach(() => {
    StoreProvider = createFastContext(intitialState).StoreProvider
    Wrapper = ({ children }) => <StoreProvider>{children}</StoreProvider>

    render(
      <Wrapper>
        <Modal />
      </Wrapper>
    )
  })

  it('should render', () => {
    expect(document.querySelector('.modal')).toBeTruthy()
    expect(document.querySelector('.modal-overlay')).toBeTruthy()
  })

  it('should unmount content and hide modal if the overlay is clicked', () => {
    expect(document.querySelector('.modal')).toBeTruthy()
    expect(document.querySelector('.modal-overlay')).toBeTruthy()

    fireEvent.click(document.querySelector('.modal-overlay'))

    expect(document.querySelector('.modal').style.display).toBe('none')
    expect(document.querySelector('.modal-content').children.length).toBe(0)
  })
})
