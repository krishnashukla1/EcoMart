// FILE: controllers/cartController.js
const Cart = require('../models/Cart');
const ProductModel = require('../models/Product');

// controllers/cartController.js
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id })
      .populate({
        path: 'items.product',
        select: 'name price images stock',
        match: { deleted: { $ne: true } } // Exclude soft-deleted products
      })
      .lean(); // Convert to plain JS object

    if (!cart) {
      return res.status(200).json({ items: [] });
    }

    // Safely transform cart items
    const safeItems = cart.items.map(item => {
      // Handle case where product is null or deleted
      if (!item.product) {
        return {
          _id: item._id,
          qty: item.qty,
          price: 0, // Default price
          product: {
            _id: 'deleted-product',
            name: '[Deleted Product]',
            price: 0,
            stock: 0,
            images: []
          }
        };
      }

      return {
        _id: item._id,
        qty: item.qty,
        price: item.product.price,
        product: {
          _id: item.product._id,
          name: item.product.name,
          price: item.product.price,
          images: item.product.images || [],
          stock: item.product.stock || 0
        }
      };
    });

    // Filter out null items if needed
    const validItems = safeItems.filter(item => item !== null);

    res.json({ items: validItems });
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ 
      message: 'Server error fetching cart',
      error: error.message 
    });
  }
};


// GET /api/cart/:itemId - Get single cart item
const getCartItemById = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const item = cart.items.id(req.params.itemId);
    if (!item) return res.status(404).json({ message: 'Cart item not found' });

    res.json(item);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// POST /api/cart - Add product to cart
const addToCart = async (req, res) => {
  try {
    const { productId, qty = 1 } = req.body;
    if (!productId) return res.status(400).json({ message: 'productId required' });

    const product = await ProductModel.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    if (product.stock < 1) return res.status(400).json({ message: 'Product out of stock' });

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }

    const itemIndex = cart.items.findIndex(i => i.product.toString() === productId);
    if (itemIndex > -1) {
      const newQty = cart.items[itemIndex].qty + Number(qty);
      if (newQty > product.stock) return res.status(400).json({ message: 'Quantity exceeds stock' });
      cart.items[itemIndex].qty = newQty;
      cart.items[itemIndex].price = product.price;
    } else {
      cart.items.push({ product: product._id, qty: Number(qty), price: product.price });
    }

    await cart.save();
    await cart.populate('items.product');
    res.status(201).json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// PUT /api/cart/:itemId - Update cart item quantity
const updateCartItem = async (req, res) => {
  try {
    const { qty } = req.body;
    if (qty == null) return res.status(400).json({ message: 'qty required' });

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const item = cart.items.id(req.params.itemId);
    if (!item) return res.status(404).json({ message: 'Cart item not found' });

    const product = await ProductModel.findById(item.product);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    if (qty > product.stock) return res.status(400).json({ message: 'Quantity exceeds stock' });

    item.qty = Number(qty);
    if (!item.price) item.price = product.price;

    await cart.save();
    await cart.populate('items.product');
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};


// DELETE /api/cart/:itemId - Remove a single cart item
const removeCartItem = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    // Find the index of the item to remove
    const itemIndex = cart.items.findIndex(
      item => item._id.toString() === req.params.itemId
    );
    
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    // Remove the item from the array
    cart.items.splice(itemIndex, 1);
    
    await cart.save();
    await cart.populate('items.product');
    res.json(cart);
  } catch (err) {
    console.error('Error removing cart item:', err);
    res.status(500).json({ 
      message: 'Server Error', 
      error: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
};

// DELETE /api/cart - Clear the entire cart
const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = [];
    await cart.save();
    res.json({ message: 'Cart cleared' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

module.exports = {
  getCart,
  getCartItemById,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart
};
