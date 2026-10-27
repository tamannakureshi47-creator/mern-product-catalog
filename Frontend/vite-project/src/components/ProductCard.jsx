import formatPrice from '../utils/formatPrice.js'

function ProductCard({ product, index, deleting, detailsLoading, onDelete, onDetails }) {
  return (
    <article className="product-card">
      <div className="product-image">
        <span className="image-index">{String(index + 1).padStart(2, '0')}</span>
        <div className="image-placeholder" aria-hidden="true">{product.title?.charAt(0)?.toUpperCase()}</div>
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          onError={(event) => { event.currentTarget.style.display = 'none' }}
        />
        <button
          className="delete-button"
          onClick={() => onDelete(product)}
          disabled={deleting}
          aria-label={`Delete ${product.title}`}
        >
          {deleting ? '…' : '×'}
        </button>
      </div>
      <div className="product-info">
        <div className="product-meta">
          <span className="category-tag">{product.category}</span>
          <span className="product-price">{formatPrice(product.price)}</span>
        </div>
        <h3>{product.title}</h3>
        <p>{product.description}</p>
        <button className="details-button" onClick={() => onDetails(product)} disabled={detailsLoading}>
          View details <span aria-hidden="true">→</span>
        </button>
      </div>
    </article>
  )
}

export default ProductCard
