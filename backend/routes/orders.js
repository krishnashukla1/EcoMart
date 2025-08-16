// FILE: routes/orders.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  placeOrder,
  getUserOrders,
  getOrderById,updateOrderStatus,deleteOrder
} = require('../controllers/orderController');

// Order Routes
router.post('/', auth, placeOrder);   // Place order
router.get('/', auth, getUserOrders); // Get all orders for logged-in user
router.get('/:id', auth, getOrderById); // Get single order
router.put('/:id/status', auth, updateOrderStatus);
router.delete('/:id', auth, deleteOrder); 


module.exports = router;
