const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/$/, '')

async function request(path, options) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  const contentType = response.headers.get('content-type')
  const result = contentType?.includes('application/json')
    ? await response.json()
    : await response.text()

  if (!response.ok) {
    const message = typeof result === 'object' && result?.message
      ? result.message
      : `Request failed (${response.status})`
    throw new Error(message)
  }

  return result
}

export async function getProducts() {
  const products = await request('/products')
  if (!Array.isArray(products)) {
    throw new Error('The products endpoint did not return a product list.')
  }
  return products
}

export function createProduct(product) {
  return request('/products', {
    method: 'POST',
    body: JSON.stringify(product),
  })
}

export function getProductById(id) {
  return request(`/products/${encodeURIComponent(id)}`)
}

export function deleteProduct(id) {
  return request(`/products/${encodeURIComponent(id)}`, { method: 'DELETE' })
}
