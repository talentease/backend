const express = require('express');
const router = express.Router();
const { registerWithEmail, loginWithEmail } = require('../controllers/authController');


// Register a new user
router.post('/register', registerWithEmail);

// Login an existing user
router.post('/login', loginWithEmail);

module.exports = router;
