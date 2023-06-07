const express = require('express');
const multer = require('multer');

const authenticateToken = require('../middlewares/authenticateToken');
const {
    createApplication,
    updateApplication,
    getApplicationByPositionId,
    getApplicationById,
} = require('../controllers/applicationController');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/:applicationId', authenticateToken, getApplicationById);
router.get('/position/:positionId', authenticateToken, getApplicationByPositionId);
router.post('/create', authenticateToken, upload.single('file'), createApplication);
router.patch('/:applicationId', authenticateToken, updateApplication);

module.exports = router;
