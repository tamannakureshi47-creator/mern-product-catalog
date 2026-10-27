import { useMemo, useState } from 'react'
import ProductCard from './ProductCard.jsx'

function ProductList({ products, loading, deletingId, detailsLoading, onDelete, onDetails, onRefresh }) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All categories')

  const categories = useMemo(
    () => [...new Set(products.map((product) => product.category).filter(Boolean))].sort(),
    [products],
  )

  const visibleProducts = useMemo(() => {
    const query = search.trim().toLowerCase()
    return products.filter((product) => {
      const matchesCategory = category === 'All categories' || product.category === category
      const matchesSearch = !query
        || [product.title, product.description, product.category]
          .some((value) => value?.toLowerCase().includes(query))
      return matchesCategory && matchesSearch
    })
  }, [products, search, category])

  return (
    <section className="catalog-panel" aria-label="Product catalog">
      <div className="catalog-toolbar">
        <div className="catalog-title">
          <span className="step-label">02 / YOUR COLLECTION</span>
          <h2>All products <span>{products.length}</span></h2>
        </div>
        <div className="filters">
          <label className="search-field">
            <span className="search-icon" aria-hidden="true">⌕</span>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search products"
              aria-label="Search products"
            />
          </label>
          <select value={category} onChange={(event) => setCategory(event.target.value)} aria-label="Filter by category">
            <option>All categories</option>
            {categories.map((item) => <option key={item}>{item}</option>)}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="empty-state">
          <span className="loader" />
          <h3>Gathering your collection</h3>
          <p>Connecting to your product catalog…</p>
        </div>
      ) : visibleProducts.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon" aria-hidden="true">✳</span>
          <h3>{products.length === 0 ? 'A little room to grow' : 'No products found'}</h3>
          <p>{products.length === 0
            ? 'Your catalog is waiting. Add your first product using the form.'
            : 'Try another search or choose a different category.'}</p>
          {products.length > 0 && (
            <button className="text-button" onClick={() => { setSearch(''); setCategory('All categories') }}>
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <div className="product-grid">
          {visibleProducts.map((product, index) => (
            <ProductCard
              key={product._id}
              product={product}
              index={index}
              deleting={deletingId === product._id}
              detailsLoading={detailsLoading}
              onDelete={onDelete}
              onDetails={onDetails}
            />
          ))}
        </div>
      )}

      <div className="catalog-footer">
        <span>SHOWING {visibleProducts.length} OF {products.length} PRODUCTS</span>
        <button className="refresh-button" onClick={onRefresh} disabled={loading}>
          <span aria-hidden="true">↻</span> Refresh
        </button>
      </div>
    </section>
  )
}

export default ProductList
