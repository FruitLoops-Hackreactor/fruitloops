import axios from 'axios'
import { Product, getProduct } from '@/utils/products'

// Generic mock of the module at the top-level and then more specific mock
// implementations within the tests since they require different results
jest.mock('axios', () => ({
  get: jest.fn(() =>
    Promise.resolve({
      data: {
        results: [{ photos: [{}] }],
      },
    })
  ),
}))

describe('products', () => {
  it('getProduct should return an object in the Product shape', async () => {
    const product = await getProduct(1)

    expect(axios.get).toHaveBeenCalledTimes(2)
    expect(product).toBeInstanceOf(Product)
  })
})
