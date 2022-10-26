import { screen, render } from '@testing-library/react'
import ImageGallery from '@/components/ProductOverview/PO-Components/ImageGallery'

describe('image gallery', () => {
  it('should display conditional render message when there are no photos', () => {
    // Refer to docs on how to get the element you want to test
    // https://testing-library.com/docs/queries/about/
    const noPhotos = [
      {
        name: 'anime photo',
        thumbnail_url: null,
      },
    ]

    render(<ImageGallery photos={noPhotos} />)
    const CRtest = screen.queryByText('No photo(s) at this time. Please check again later.')
    expect(CRtest).toBeTruthy()
  })

  it('should not have display buttons to toggle vertical carousel when passed in no photos', () => {
    // Refer to docs on how to get the element you want to test
    // https://testing-library.com/docs/queries/about/
    const photos = []

    render(<ImageGallery photos={photos} />)
    const CRtest = screen.queryByTestId('toggle-vertical-carousel')
    expect(CRtest).toBeFalsy()
  })
})

describe('test', () => {
  it('should pass', () => {
    expect(true).toBe(true)
  })
})
