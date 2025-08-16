// FILE: models/Cart.js
const mongoose3 = require('mongoose');

const CartItemSchema = new mongoose3.Schema(
  {
    product: { type: mongoose3.Schema.Types.ObjectId, ref: 'Product', required: true },
    qty: { type: Number, default: 1 },
    price: { type: Number } // snapshot price
  },
  { _id: true }
);

const CartSchema = new mongoose3.Schema(
  {
    user: { type: mongoose3.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    items: [CartItemSchema]
  },
  { timestamps: true }
);

module.exports = mongoose3.model('Cart', CartSchema);