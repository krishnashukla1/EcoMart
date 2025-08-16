// FILE: models/Product.js
const mongoose2 = require('mongoose');

const ProductSchema = new mongoose2.Schema(
  {
    name: { type: String, required: true, index: true },
    description: { type: String },
    price: { type: Number, required: true },
    brand: { type: String },
    category: { type: String },
    stock: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    images: [{ type: String }]
  },
  { timestamps: true }
);

module.exports = mongoose2.model('Product', ProductSchema);