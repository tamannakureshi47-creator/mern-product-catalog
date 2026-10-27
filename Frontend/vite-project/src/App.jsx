import { useEffect, useState } from 'react'
import ProductDetailsModal from './components/ProductDetailsModal.jsx'
import ProductForm from './components/ProductForm.jsx'
import ProductList from './components/ProductList.jsx'
import { createProduct, deleteProduct, getProductById, getProducts } from './services/productApi.js'
import './App.css'

const emptyForm = {
  title: '',
  description: '',
  price: '',
  image: '',
  category: '',
}

function App() {
  const [products, setProducts] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState(null)
  const [detailsLoading, setDetailsLoading] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  useEffect(() => {
    let isCurrent = true
    getProducts()
      .then((data) => {
        if (isCurrent) setProducts(data)
      })
      .catch((loadError) => {
        if (isCurrent) setError(`Could not load products. ${loadError.message}`)
      })
      .finally(() => {
        if (isCurrent) setLoading(false)
      })

    return () => {
      isCurrent = false
    }
  }, [])

  async function loadProducts() {
    setLoading(true)
    setError('')
    try {
      setProducts(await getProducts())
    } catch (loadError) {
      setError(`Could not load products. ${loadError.message}`)
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setSaving(true)
    setError('')
    setNotice('')

    try {
      const createdProduct = await createProduct({
        ...form,
        title: form.title.trim(),
        description: form.description.trim(),
        category: form.category.trim(),
        image: form.image.trim(),
        price: Number(form.price),
      })
      setProducts((current) => [createdProduct, ...current])
      setForm(emptyForm)
      setNotice('Product added to your catalog.')
    } catch (saveError) {
      setError(`Could not add product. ${saveError.message}`)
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(product) {
    const confirmed = window.confirm(`Delete "${product.title}" from your catalog?`)
    if (!confirmed) return

    setDeletingId(product._id)
    setError('')
    setNotice('')
    try {
      await deleteProduct(product._id)
      setProducts((current) => current.filter((item) => item._id !== product._id))
      if (selectedProduct?._id === product._id) setSelectedProduct(null)
      setNotice('Product deleted.')
    } catch (deleteError) {
      setError(`Could not delete product. ${deleteError.message}`)
    } finally {
      setDeletingId(null)
    }
  }

  async function showDetails(product) {
    setDetailsLoading(true)
    setError('')
    try {
      setSelectedProduct(await getProductById(product._id))
    } catch (detailsError) {
      setError(`Could not load product details. ${detailsError.message}`)
    } finally {
      setDetailsLoading(false)
    }
  }

  function updateForm(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Fieldnote home">
          <span className="brand-mark">f</span>
          <span>fieldnote<span className="brand-dot">.</span></span>
        </a>
        <div className="topbar-note">
          <span className="status-dot" />
          Product workspace
        </div>
      </header>

      <section className="intro">
        <div className="intro-copy">
          <p className="eyebrow">YOUR STORE, IN GOOD ORDER</p>
          <h1>Product catalog</h1>
          <p className="intro-text">Keep your collection tidy. Add products, browse what’s in stock, and make updates as you go.</p>
        </div>
        <div className="catalog-count">
          <span className="count-number">{products.length.toString().padStart(2, '0')}</span>
          <span className="count-label">products<br />in your catalog</span>
        </div>
      </section>

      {(error || notice) && (
        <div className={`feedback ${error ? 'feedback-error' : 'feedback-success'}`} role={error ? 'alert' : 'status'}>
          <span>{error || notice}</span>
          {error && (
            <button className="feedback-dismiss" onClick={() => setError('')} aria-label="Dismiss error">
              ×
            </button>
          )}
        </div>
      )}

      <div className="workspace">
        <ProductForm
          form={form}
          onChange={updateForm}
          onSubmit={handleSubmit}
          saving={saving}
        />
        <ProductList
          products={products}
          loading={loading}
          deletingId={deletingId}
          detailsLoading={detailsLoading}
          onDelete={handleDelete}
          onDetails={showDetails}
          onRefresh={loadProducts}
        />
      </div>

      <ProductDetailsModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </main>
  )
}

export default App
