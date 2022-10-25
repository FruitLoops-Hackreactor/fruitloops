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
  })

  it('should render', () => {
    const { queryByTestId } = render(
      <Wrapper>
        <Modal />
      </Wrapper>
    )

    expect(queryByTestId('modal')).toBeTruthy()
    expect(queryByTestId('modal-overlay')).toBeTruthy()
  })

  it('should unmount content and hide modal if the overlay is clicked', () => {
    const { queryByTestId } = render(
      <Wrapper>
        <Modal />
      </Wrapper>
    )

    expect(queryByTestId('modal')).toBeTruthy()
    expect(queryByTestId('modal-overlay')).toBeTruthy()

    fireEvent.click(queryByTestId('modal-overlay'))

    expect(queryByTestId('modal').style.display).toBe('none')
    expect(queryByTestId('modal-content').children.length).toBe(0)
  })
})
