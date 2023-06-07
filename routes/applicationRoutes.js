const express = require('express');
const multer = require('multer');

const authenticateToken = require('../middlewares/authenticateToken');
const { createApplication } = require('../controllers/applicationController');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/create', authenticateToken, upload.single('file'), createApplication);

module.exports = router;
