function ProductForm({ form, onChange, onSubmit, saving }) {
  return (
    <aside className="form-panel">
      <div className="panel-heading">
        <span className="step-label">01 / CATALOG</span>
        <h2>Add a product</h2>
        <p>Give your next item a place in the collection.</p>
      </div>

      <form className="product-form" onSubmit={onSubmit}>
        <label>
          <span>Product name</span>
          <input
            name="title"
            value={form.title}
            onChange={onChange}
            placeholder="e.g. Everyday ceramic mug"
            required
            maxLength={120}
          />
        </label>
        <label>
          <span>Description</span>
          <textarea
            name="description"
            value={form.description}
            onChange={onChange}
            placeholder="What makes this one special?"
            rows="4"
            required
            maxLength={1000}
          />
        </label>
        <div className="form-row">
          <label>
            <span>Price</span>
            <div className="price-input">
              <span>$</span>
              <input
                name="price"
                type="number"
                value={form.price}
                onChange={onChange}
                placeholder="0.00"
                min="0"
                step="0.01"
                required
              />
            </div>
          </label>
          <label>
            <span>Category</span>
            <input
              name="category"
              value={form.category}
              onChange={onChange}
              placeholder="Home, apparel…"
              required
              maxLength={60}
            />
          </label>
        </div>
        <label>
          <span>Image URL</span>
          <input
            name="image"
            type="url"
            value={form.image}
            onChange={onChange}
            placeholder="https://example.com/image.jpg"
            required
          />
        </label>
        {form.image && (
          <div className="image-preview">
            <img
              src={form.image}
              alt="Product preview"
              onError={(event) => { event.currentTarget.style.display = 'none' }}
            />
          </div>
        )}
        <button className="submit-button" type="submit" disabled={saving}>
          {saving ? 'Adding product…' : 'Add to catalog'}
          {!saving && <span aria-hidden="true">↗</span>}
        </button>
      </form>
      <p className="form-footnote">All fields are required. Image must be a public URL.</p>
    </aside>
  )
}

export default ProductForm
