// FILE: server.js
require('dotenv').config();
require('express-async-errors'); // handle async errors in routes automatically
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');

const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/orders');
const paymentRoutes = require('./routes/payments');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Connect DB
connectDB();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(compression());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes); // stubbed payments

// Health check
app.get('/', (req, res) => res.json({status: 'ok', message: 'Ecom API running'}));

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


/*
PS D:\F26-CART-AMAZON\New Project> git add .                                                              
PS D:\F26-CART-AMAZON\New Project> git commit -m "first commit"
PS D:\F26-CART-AMAZON\New Project> git push -u origin main
----------------


NODE   https://ecomart-5vnc.onrender.com

REACT  https://ecomart-1-1qxk.onrender.com

*/