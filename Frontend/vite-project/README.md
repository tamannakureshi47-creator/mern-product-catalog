# Fieldnote Product Catalog

React frontend for the Express/MongoDB product API in `Backend`.

## Run locally

1. Start the backend with `npm run dev` from the `Backend` folder. It listens on port `5000` by default.
2. From this folder, install dependencies with `npm install` if needed.
3. Start Vite with `npm run dev`.

The frontend uses `http://localhost:5000/api` by default. To use another API base URL, create a `.env` file in this folder:

```env
VITE_API_URL=http://localhost:5000/api
```

The API base URL should include `/api`. The interface uses `GET /products`, `POST /products`, `GET /products/:id`, and `DELETE /products/:id`.

## Source layout

- `src/App.jsx` coordinates catalog state and API actions.
- `src/components/` contains the product form, list, card, and details modal.
- `src/services/productApi.js` contains the backend request functions.
- `src/utils/formatPrice.js` contains shared price formatting.
- `src/App.css` and `src/index.css` contain app and global styles.
