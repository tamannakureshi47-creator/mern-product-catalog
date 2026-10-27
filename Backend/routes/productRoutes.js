
import express from "express";

import {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProduct
} from "../controller/productController.js";

const router = express.Router();

router.post("/products", createProduct);
router.get("/products", getAllProducts);
router.get("/products/:id", getProductById);
router.delete("/products/:id", deleteProduct);

export default router;
