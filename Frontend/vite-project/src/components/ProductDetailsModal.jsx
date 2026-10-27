import formatPrice from '../utils/formatPrice.js'

function ProductDetailsModal({ product, onClose }) {
  if (!product) return null

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <section className="details-modal" role="dialog" aria-modal="true" aria-labelledby="details-title">
        <button className="modal-close" onClick={onClose} aria-label="Close product details">×</button>
        <div className="modal-image">
          <div className="image-placeholder" aria-hidden="true">{product.title?.charAt(0)?.toUpperCase()}</div>
          <img
            src={product.image}
            alt={product.title}
            onError={(event) => { event.currentTarget.style.display = 'none' }}
          />
        </div>
        <div className="modal-content">
          <span className="category-tag">{product.category}</span>
          <h2 id="details-title">{product.title}</h2>
          <p className="modal-price">{formatPrice(product.price)}</p>
          <p className="modal-description">{product.description}</p>
          <span className="product-id">PRODUCT ID · {product._id}</span>
        </div>
      </section>
    </div>
  )
}

export default ProductDetailsModal
