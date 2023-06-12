const express = require('express');

const { registerWithEmail } = require('../controllers/authController');
const { createCompanyAdmin } = require('../controllers/companyController');

const router = express.Router();

router.post('/register', registerWithEmail);
router.post('/register/company', createCompanyAdmin);

module.exports = router;
