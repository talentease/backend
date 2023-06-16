const express = require('express');
const multer = require('multer');

const authenticateToken = require('../middlewares/authenticateToken');
const {
    createApplication,
    updateApplication,
    getApplicationById,
    getApplicationByPositionId,
    getApplicationByCandidateId,
} = require('../controllers/applicationController');

const router = express.Router();
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        // no larger than 5mb.
        fileSize: 12 * 1024 * 1024,
    },
});

router.get('/:applicationId', authenticateToken, getApplicationById);
router.get('/position/:positionId', authenticateToken, getApplicationByPositionId);
router.get('/user/:candidateId', authenticateToken, getApplicationByCandidateId);
router.post('/create', authenticateToken, upload.single('cv'), createApplication);
router.patch('/:applicationId', authenticateToken, updateApplication);

module.exports = router;
