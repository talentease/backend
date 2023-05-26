const express = require('express');
const router = express.Router();
const { registerWithEmail, validateLogin } = require('../controllers/authController');


// Register a new user
router.post('/register', registerWithEmail);
router.post('/validate', validateLogin)

module.exports = router;
