// FILE: routes/auth.js
const express5 = require('express');
const routerAuth = express5.Router();
const jwt = require('jsonwebtoken');
const UserModel = require('../models/User');

function createToken(user) {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

// Register
routerAuth.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: 'All fields required' });
  const existing = await UserModel.findOne({ email });
  if (existing) return res.status(400).json({ message: 'User already exists' });
  const user = await UserModel.create({ name, email, password });
  const token = createToken(user);
  res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email } });
});

// Login
routerAuth.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password required' });
  const user = await UserModel.findOne({ email });
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });
  const isMatch = await user.matchPassword(password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
  const token = createToken(user);
  res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
});


module.exports = routerAuth;
