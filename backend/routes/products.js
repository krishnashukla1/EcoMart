// FILE: routes/products.js
const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

// Routes
router.get('/', getProducts);         // GET all
router.get('/:id', getProductById);   // GET single
router.post('/', createProduct);      // POST create
router.put('/:id', updateProduct);    // PUT update
router.delete('/:id', deleteProduct); // DELETE remove

module.exports = router;
