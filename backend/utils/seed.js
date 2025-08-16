// FILE: utils/seed.js
// Simple seeder to create sample products and a test user
require('dotenv').config();
const connectDB2 = require('../config/db');
const Product = require('../models/Product');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

(async () => {
  try {
    await connectDB2();
    // clear products
    await Product.deleteMany({});

    const sampleProducts = [
      { name: 'Phone Model X', description: 'A great smartphone', price: 19999, brand: 'PhoneBrand', category: 'Mobiles', stock: 50, rating: 4.5 },
      { name: 'Wireless Headphones', description: 'Noise cancelling', price: 2999, brand: 'SoundCo', category: 'Audio', stock: 100, rating: 4.2 },
      { name: 'Laptop Pro 14', description: 'Light & powerful', price: 79999, brand: 'CompTech', category: 'Laptops', stock: 20, rating: 4.7 }
    ];

    await Product.insertMany(sampleProducts);
    console.log('Sample products added');

    // create test user
    const email = 'test@example.com';
    const existing = await User.findOne({ email });
    if (!existing) {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash('password123', salt);
      await User.create({ name: 'Test User', email, password: hashed });
      console.log('Test user created: test@example.com / password123');
    } else {
      console.log('Test user already exists');
    }

    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
})();
