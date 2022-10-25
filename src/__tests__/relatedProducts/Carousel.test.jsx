import { render } from '@testing-library/react'
import Carousel from '@/components/RelatedProducts/Carousel'

describe('Related Products - Carousel', () => {
  const max = 4

  it('should not display carousel if there are no children', () => {
    const { queryByTestId } = render(
      <Carousel max={max}>
        <></>
      </Carousel>
    )

    expect(queryByTestId('products-carousel')).toBeFalsy()
  })
})
