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
