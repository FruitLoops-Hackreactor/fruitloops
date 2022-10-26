import { render } from '@testing-library/react'
import OutfitList from '@/components/RelatedProducts/OutfitList'

describe('RelatedProducts - OutfitList', () => {
  const max = 4

  it('should render and include the add-to-outfit-card', () => {
    render(<OutfitList max={max} loading={false}></OutfitList>)

    expect(document.querySelector('.add-card')).toBeTruthy()
  })
})
