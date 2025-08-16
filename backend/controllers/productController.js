// FILE: controllers/productController.js
const Product = require('../models/Product');

// @desc    Get all products
const getProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      search,
      minPrice,
      maxPrice,
      brand,
      category,
      sort
    } = req.query;

    const filter = {};

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    if (brand) filter.brand = brand;
    if (category) filter.category = category;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    let sortOption = { createdAt: -1 };
    if (sort === 'priceAsc') sortOption = { price: 1 };
    else if (sort === 'priceDesc') sortOption = { price: -1 };
    else if (sort === 'rating') sortOption = { rating: -1 };

    const skip = (Number(page) - 1) * Number(limit);

    const [total, products] = await Promise.all([
      Product.countDocuments(filter),
      Product.find(filter)
        .sort(sortOption)
        .skip(skip)
        .limit(Number(limit))
    ]);

    res.json({
      total,
      page: Number(page),
      limit: Number(limit),
      products
    });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// @desc    Get single product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// @desc    Create a new product
const createProduct = async (req, res) => {
  try {
    const { name, description, price, brand, category, stock, rating, images } = req.body;

    if (!name || !price) {
      return res.status(400).json({ message: 'Name and price are required' });
    }

    const newProduct = new Product({
      name,
      description,
      price,
      brand,
      category,
      stock,
      rating,
      images
    });

    const savedProduct = await newProduct.save();

    res.status(201).json({
      message: 'Product created successfully',
      product: savedProduct
    });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// @desc    Update product by ID
const updateProduct = async (req, res) => {
  try {
    const updates = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });

    res.json({
      message: 'Product updated successfully',
      product: updatedProduct
    });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// @desc    Delete product by ID
const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });

    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
