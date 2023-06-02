const express = require('express');

const { registerWithEmail } = require('../controllers/authController');

const router = express.Router();

router.post('/register', registerWithEmail);

module.exports = router;
