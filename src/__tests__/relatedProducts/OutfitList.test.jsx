import { render } from '@testing-library/react'
import OutfitList from '@/components/RelatedProducts/OutfitList'

describe('RelatedProducts - OutfitList', () => {
  const max = 4

  it('should render and include the add-to-outfit-card', () => {
    const { queryByTestId } = render(<OutfitList max={max} loading={false}></OutfitList>)

    expect(queryByTestId('add-to-outfit-card')).toBeTruthy()
  })
})
