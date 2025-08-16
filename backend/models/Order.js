// FILE: models/Order.js
const mongoose4 = require('mongoose');

const OrderItemSchema = new mongoose4.Schema({
  product: { type: mongoose4.Schema.Types.ObjectId, ref: 'Product', required: true },
  name: { type: String },
  qty: { type: Number, required: true },
  price: { type: Number, required: true }
});
const shippingAddressSchema = new mongoose4.Schema({
  address: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true }
});
const OrderSchema = new mongoose4.Schema(
  {
    user: { type: mongoose4.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [OrderItemSchema],
    // shippingAddress: { type: String, required: true },
    shippingAddress: shippingAddressSchema, //// Changed from String to Object

    paymentMethod: { type: String, required: true },
    paymentResult: { type: Object }, // store gateway response
    itemsPrice: { type: Number, required: true },
    taxPrice: { type: Number, default: 0 },
    shippingPrice: { type: Number, default: 0 },
    totalPrice: { type: Number, required: true },
    status: { type: String, default: 'Pending' } // Pending, Paid, Shipped, Delivered
  },
  { timestamps: true }
);

module.exports = mongoose4.model('Order', OrderSchema);

/*
{
  "shippingAddress": {
    "address": "123 MG Road",
    "city": "Bangalore",
    "postalCode": "560001",
    "country": "India"
  },
  "paymentMethod": "COD",
  "items": [
    {
      "productId": "64f92d84a2d4a2c8f0b5c3d1",
      "qty": 2
    }
  ]
}

*/