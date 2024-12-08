// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserDetails } = require('../controllers/userController');

// User registration route
router.post('/register', registerUser);

// User login route
router.post('/login', loginUser);

// Get user details (protected route)
router.get('/profile', getUserDetails);

module.exports = router;
