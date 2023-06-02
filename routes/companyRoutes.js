const express = require('express');

const { createCompanyAdmin } = require('../controllers/companyController');

const router = express.Router();

router.post('/admin', createCompanyAdmin);

module.exports = router;
