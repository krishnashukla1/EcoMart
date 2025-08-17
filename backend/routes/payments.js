
// FILE: routes/payments.js
// Payment endpoints are stubbed. Integrate with Razorpay/Stripe/PayPal in production.

// FILE: routes/payments.js
const express = require('express');
const routerPayments = express.Router();

// POST /api/payments - create a new payment
routerPayments.post('/', async (req, res) => {
  const { orderId, amount, currency } = req.body;

  if (!orderId || !amount || !currency) {
    return res.status(400).json({ message: 'orderId, amount & currency are required' });
  }

  const newPayment = {
    paymentId: Math.floor(Math.random() * 1000000).toString(), // random ID for stub
    orderId,
    amount,
    currency,
    status: 'pending',
    createdAt: new Date().toISOString()
  };

  res.status(201).json({
    success: true,
    data: newPayment,
    message: 'Payment created successfully (stub). Integrate real gateway.',
  });
});

// GET /api/payments - get all payments (stub)
routerPayments.get('/', async (req, res) => {
  try {
    const samplePayments = [
      {
        paymentId: '101',
        orderId: 'ORD123',
        amount: 1500,
        currency: 'INR',
        status: 'completed',
        createdAt: '2025-08-12T07:30:00.000Z'
      },
      {
        paymentId: '102',
        orderId: 'ORD124',
        amount: 2999,
        currency: 'INR',
        status: 'pending',
        createdAt: '2025-08-12T07:40:00.000Z'
      }
    ];

    res.status(200).json({
      success: true,
      count: samplePayments.length,
      data: samplePayments
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT /api/payments/:id - update payment status
routerPayments.put('/:id', async (req, res) => {
  const { status } = req.body;
  const paymentId = req.params.id;

  if (!status) {
    return res.status(400).json({ message: 'status required' });
  }

  res.json({
    success: true,
    paymentId,
    status,
    message: 'Payment status updated (stub). Integrate real gateway.',
  });
});

// DELETE /api/payments/:id - delete/cancel a payment
routerPayments.delete('/:id', async (req, res) => {
  const paymentId = req.params.id;
  res.json({
    success: true,
    paymentId,
    message: 'Payment deleted/cancelled (stub). Integrate real gateway.',
  });
});

module.exports = routerPayments;


/**
 * 
const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
});

// Create Razorpay order
router.post("/order", async (req, res) => {
  try {
    const { orderId } = req.body;
    const options = {
      amount: 50000, // paise (₹500)
      currency: "INR",
      receipt: `order_rcptid_${orderId}`,
    };
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Verify payment
router.post("/verify", async (req, res) => {
  try {
    const { orderId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const sign = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (sign === razorpay_signature) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

 */