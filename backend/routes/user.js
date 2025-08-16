// const express5 = require('express');
// const routerAuth = express5.Router();
// const jwt = require('jsonwebtoken');
// const UserModel = require('../models/User');

// // Protected route - requires authentication
// router.get('/:id', auth, async (req, res) => {
//   try {
//     const user = await UserModel.findById(req.params.id).select('-password')
//     if (!user) return res.status(404).json({ message: 'User not found' })
//     res.json(user)
//   } catch (err) {
//     res.status(500).json({ message: 'Server Error', error: err.message })
//   }
// })

// // Protected route - requires authentication
// router.put('/profile', auth, async (req, res) => {
//   try {
//     const user = await UserModel.findById(req.user._id)
    
//     if (user) {
//       user.name = req.body.name || user.name
//       user.email = req.body.email || user.email
//       user.address = req.body.address || user.address
      
//       const updatedUser = await user.save()
//       res.json({
//         _id: updatedUser._id,
//         name: updatedUser.name,
//         email: updatedUser.email,
//         address: updatedUser.address
//       })
//     } else {
//       res.status(404).json({ message: 'User not found' })
//     }
//   } catch (err) {
//     res.status(500).json({ message: 'Server Error', error: err.message })
//   }
// })