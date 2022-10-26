import { render } from '@testing-library/react'
import Carousel from '@/components/RelatedProducts/Carousel'

describe('Related Products - Carousel', () => {
  const max = 4

  it('should not display carousel if there are no children', () => {
    render(
      <Carousel max={max}>
        <></>
      </Carousel>
    )

    expect(document.querySelector('.products-carousel')).toBeFalsy()
  })
})
