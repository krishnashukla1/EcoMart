// FILE: routes/cart.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getCart,
  getCartItemById,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart
} = require('../controllers/cartController');

// Cart Routes
router.get('/', auth, getCart);             // Get entire cart
router.get('/:itemId', auth, getCartItemById); // Get specific cart item
router.post('/', auth, addToCart);          // Add product to cart
router.put('/:itemId', auth, updateCartItem); // Update cart item qty
router.delete('/:itemId', auth, removeCartItem); // Remove single item
router.delete('/', auth, clearCart);        // Clear cart

module.exports = router;
