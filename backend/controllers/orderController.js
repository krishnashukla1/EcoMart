// // FILE: controllers/orderController.js
// const OrderModel = require('../models/Order');
// const CartModel = require('../models/Cart');
// const ProductModel = require('../models/Product');

// // POST /api/orders - Place an order
// const placeOrder = async (req, res) => {
//   try {
//     const { shippingAddress, paymentMethod, items } = req.body;
//     if (!shippingAddress || !paymentMethod) {
//       return res.status(400).json({ message: 'shippingAddress & paymentMethod required' });
//     }

//     let orderItems = [];

//     // If "buy now" items are provided
//     if (items && Array.isArray(items) && items.length > 0) {
//       for (const it of items) {
//         const product = await ProductModel.findById(it.productId);
//         if (!product) return res.status(404).json({ message: `Product ${it.productId} not found` });
//         if (product.stock < it.qty) return res.status(400).json({ message: `Not enough stock for ${product.name}` });
//         orderItems.push({ product: product._id, name: product.name, qty: it.qty, price: product.price });
//       }
//     } 
//     // Else, use cart
//     else {
//       const cart = await CartModel.findOne({ user: req.user._id }).populate('items.product');
//       if (!cart || cart.items.length === 0) return res.status(400).json({ message: 'Cart is empty' });

//       for (const i of cart.items) {
//         const product = await ProductModel.findById(i.product);
//         if (!product) return res.status(404).json({ message: `Product ${i.product} not found` });
//         if (product.stock < i.qty) return res.status(400).json({ message: `Not enough stock for ${product.name}` });
//         orderItems.push({ product: product._id, name: product.name, qty: i.qty, price: i.price || product.price });
//       }
//     }

//     // Totals
//     const itemsPrice = orderItems.reduce((sum, it) => sum + it.price * it.qty, 0);
//     const taxPrice = Math.round(itemsPrice * 0.05 * 100) / 100;
//     const shippingPrice = itemsPrice > 500 ? 0 : 50;
//     const totalPrice = Math.round((itemsPrice + taxPrice + shippingPrice) * 100) / 100;

//     // Create order
//     const order = await OrderModel.create({
//       user: req.user._id,
//       items: orderItems,
//       shippingAddress,
//       paymentMethod,
//       itemsPrice,
//       taxPrice,
//       shippingPrice,
//       totalPrice,
//       status: paymentMethod === 'COD' ? 'Pending' : 'Paid'
//     });

//     // Decrement stock
//     for (const it of orderItems) {
//       await ProductModel.updateOne({ _id: it.product }, { $inc: { stock: -it.qty } });
//     }

//     // Clear cart if used
//     if (!items || items.length === 0) {
//       await CartModel.findOneAndUpdate({ user: req.user._id }, { items: [] });
//     }

//     res.status(201).json(order);
//   } catch (err) {
//     res.status(500).json({ message: 'Server Error', error: err.message });
//   }
// };

// // GET /api/orders - Get user's orders
// const getUserOrders = async (req, res) => {
//   try {
//     const orders = await OrderModel.find({ user: req.user._id }).sort({ createdAt: -1 });
//     res.json(orders);
//   } catch (err) {
//     res.status(500).json({ message: 'Server Error', error: err.message });
//   }
// };

// // GET /api/orders/:id - Get single order
// const getOrderById = async (req, res) => {
//   try {
//     const order = await OrderModel.findById(req.params.id).populate('items.product');
//     if (!order) return res.status(404).json({ message: 'Order not found' });
//     if (order.user.toString() !== req.user._id.toString()) {
//       return res.status(403).json({ message: 'Access denied' });
//     }
//     res.json(order);
//   } catch (err) {
//     res.status(500).json({ message: 'Server Error', error: err.message });
//   }
// };

// module.exports = {
//   placeOrder,
//   getUserOrders,
//   getOrderById
// };


//===================

// FILE: controllers/orderController.js
const OrderModel = require('../models/Order');
const CartModel = require('../models/Cart');
const ProductModel = require('../models/Product');
const mongoose4 = require('mongoose');

// POST /api/orders - Place an order
// const placeOrder = async (req, res) => {
//   try {
//     const { shippingAddress, paymentMethod, items } = req.body;
//     if (!shippingAddress || !paymentMethod) {
//       return res.status(400).json({ message: 'shippingAddress & paymentMethod required' });
//     }

//     let orderItems = [];

//     // If "buy now" items are provided
//     if (items && Array.isArray(items) && items.length > 0) {
//       for (const it of items) {
//         const product = await ProductModel.findById(it.productId);
//         if (!product) return res.status(404).json({ message: `Product ${it.productId} not found` });
//         if (product.stock < it.qty) return res.status(400).json({ message: `Not enough stock for ${product.name}` });
//         orderItems.push({ product: product._id, name: product.name, qty: it.qty, price: product.price });
//       }
//     } 
//     // Else, use cart
//     else {
//       const cart = await CartModel.findOne({ user: req.user._id }).populate('items.product');
//       if (!cart || cart.items.length === 0) return res.status(400).json({ message: 'Cart is empty' });

//       for (const i of cart.items) {
//         const product = await ProductModel.findById(i.product);
//         if (!product) return res.status(404).json({ message: `Product ${i.product} not found` });
//         if (product.stock < i.qty) return res.status(400).json({ message: `Not enough stock for ${product.name}` });
//         orderItems.push({ product: product._id, name: product.name, qty: i.qty, price: i.price || product.price });
//       }
//     }

//     // Totals
//     const itemsPrice = orderItems.reduce((sum, it) => sum + it.price * it.qty, 0);
//     const taxPrice = Math.round(itemsPrice * 0.05 * 100) / 100;
//     const shippingPrice = itemsPrice > 500 ? 0 : 50;
//     const totalPrice = Math.round((itemsPrice + taxPrice + shippingPrice) * 100) / 100;

//     // Create order
//     const order = await OrderModel.create({
//       user: req.user._id,
//       items: orderItems,
//       shippingAddress,
//       paymentMethod,
//       itemsPrice,
//       taxPrice,
//       shippingPrice,
//       totalPrice,
//       status: paymentMethod === 'COD' ? 'Pending' : 'Paid'
//     });

//     // Decrement stock
//     for (const it of orderItems) {
//       await ProductModel.updateOne({ _id: it.product }, { $inc: { stock: -it.qty } });
//     }

//     // Clear cart if used
//     if (!items || items.length === 0) {
//       await CartModel.findOneAndUpdate({ user: req.user._id }, { items: [] });
//     }

//     res.status(201).json(order);
//   } catch (err) {
//     res.status(500).json({ message: 'Server Error', error: err.message });
//   }
// };

const placeOrder = async (req, res) => {
  try {
    console.log('Incoming order request:', {
      user: req.user._id,
      body: req.body
    });
    const { shippingAddress, paymentMethod, items } = req.body;
    console.log('Shipping Address:', shippingAddress);
    console.log('Payment Method:', paymentMethod);
    console.log('Items:', items);
    // Validate shipping address structure
    if (!shippingAddress || typeof shippingAddress !== 'object' ||
      !shippingAddress.address || !shippingAddress.city ||
      !shippingAddress.postalCode || !shippingAddress.country) {
      return res.status(400).json({
        message: 'Shipping address must contain address, city, postalCode, and country'
      });
    }



    // Validate payment method
    const validPaymentMethods = ['Credit Card', 'PayPal', 'COD', 'Stripe'];
    if (!validPaymentMethods.includes(paymentMethod)) {
      return res.status(400).json({
        message: `Invalid payment method. Must be one of: ${validPaymentMethods.join(', ')}`
      });
    }

    let orderItems = [];
    const productUpdates = [];

    // Process items (either from direct purchase or cart)
    const itemSource = items?.length > 0 ? items :
      (await CartModel.findOne({ user: req.user._id }).populate('items.product'))?.items;

    if (!itemSource || itemSource.length === 0) {
      return res.status(400).json({ message: 'No items in order' });
    }

    for (const item of itemSource) {
      const productId = item.productId || item.product?._id || item.product;
      const qty = item.qty;

      if (!productId || !qty) {
        return res.status(400).json({ message: 'Invalid item format' });
      }

      const product = await ProductModel.findById(productId);
      if (!product) {
        return res.status(404).json({ message: `Product ${productId} not found` });
      }

      if (product.stock < qty) {
        return res.status(400).json({
          message: `Not enough stock for ${product.name}. Available: ${product.stock}`
        });
      }

      orderItems.push({
        product: product._id,
        name: product.name,
        qty,
        price: item.price || product.price
      });

      productUpdates.push({
        updateOne: {
          filter: { _id: product._id },
          update: { $inc: { stock: -qty } }
        }
      });
    }

    // Calculate totals
    const itemsPrice = orderItems.reduce((sum, it) => sum + (it.price * it.qty), 0);
    const taxPrice = Math.round(itemsPrice * 0.05 * 100) / 100;
    const shippingPrice = itemsPrice > 500 ? 0 : 50;
    const totalPrice = Math.round((itemsPrice + taxPrice + shippingPrice) * 100) / 100;

    // Create order
    const order = new OrderModel({
      user: req.user._id,
      items: orderItems,
      shippingAddress: {
        address: shippingAddress.address,
        city: shippingAddress.city,
        postalCode: shippingAddress.postalCode,
        country: shippingAddress.country
      },
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      status: paymentMethod === 'COD' ? 'Pending' : 'Paid'
    });

    // Execute all updates in a transaction
    const session = await mongoose4.startSession();
    session.startTransaction();

    try {
      await order.save({ session });

      if (productUpdates.length > 0) {
        await ProductModel.bulkWrite(productUpdates, { session });
      }

      // Clear cart if order came from cart
      if (!items || items.length === 0) {
        await CartModel.findOneAndUpdate(
          { user: req.user._id },
          { $set: { items: [] } },
          { session }
        );
      }

      await session.commitTransaction();
      res.status(201).json(order);
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }

  } catch (err) {
    console.error('Order placement error:', err);
    res.status(500).json({
      message: 'Failed to place order',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};


// GET /api/orders - Get user's orders
const getUserOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// GET /api/orders/:id - Get single order
// const getOrderById = async (req, res) => {
//   try {
//     const order = await OrderModel.findById(req.params.id).populate('items.product');

//     if (!order) return res.status(404).json({ message: 'Order not found' });
//     if (order.user.toString() !== req.user._id.toString()) {
//       return res.status(403).json({ message: 'Access denied' });
//     }
//     res.json(order);
//   } catch (err) {
//     res.status(500).json({ message: 'Server Error', error: err.message });
//   }
// };
// FILE: controllers/orderController.js
const getOrderById = async (req, res) => {
  try {
    const order = await OrderModel.findById(req.params.id)
      .populate({
        path: 'items.product',
        select: 'name price images', // Explicitly include images
      });

    if (!order) return res.status(404).json({ message: 'Order not found' });
    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};


// PUT /api/orders/:id/status - Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) return res.status(400).json({ message: 'Status required' });

    // Validate status
    const validStatuses = ['Pending', 'Paid', 'Shipped', 'Delivered', 'Completed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const order = await OrderModel.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    order.status = status;
    await order.save();
    res.json({ message: 'Order status updated', order });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// DELETE /api/orders/:id - Delete an order
const deleteOrder = async (req, res) => {
  try {
    const order = await OrderModel.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Ensure the logged-in user owns the order
    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Optional: prevent deleting orders that are already Paid or Completed
    if (['Paid', 'Shipped', 'Delivered', 'Completed'].includes(order.status)) {
      return res.status(400).json({ message: 'Cannot delete order after payment or shipment' });
    }

    await order.deleteOne();

    res.json({ message: 'Order deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

module.exports = {
  placeOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder
};