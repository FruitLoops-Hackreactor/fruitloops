import axios from 'axios'

export class Product {
  constructor(product) {
    this.id = product.id
    this.name = product.name
    this.slogan = product.slogan
    this.description = product.description
    this.category = product.category
    this.features = product.features
    this.default_price = product.default_price
    this.styles = product.styles.map((style) => ({
      style_id: style.style_id,
      name: style.name,
      original_price: style.original_price,
      sale_price: style.sale_price,
      default: style['default?'],
      photos: style.photos.map((photo) => ({
        thumbnail_url: photo.thumbnail_url,
        url: photo.url,
      })),
    }))
  }
}

export const getProduct = async (id) =>
  new Product({
    // Product details
    ...(await axios.get(`/products/${id}`).then((res) => res.data)),
    // Product styles
    styles: await axios.get(`/products/${id}/styles`).then((res) => res.data.results),
  })

export const getProducts = async (count) => {
  try {
    // Get the products from the API
    const products = await axios.get(`/products?count=${count}`).then((res) => res.data)
    // Map each product with the details and styles
    return await Promise.all(products.map(({ id }) => getProduct(id)))
  } catch (err) {
    console.error(err)
    return []
  }
}
