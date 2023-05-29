const express = require('express');
const router = express.Router();
const { registerWithEmail, validateLogin } = require('../controllers/authController');


// Register a new user
router.post('/register', registerWithEmail);

module.exports = router;
