const express = require('express');

const authenticateToken = require('../middlewares/authenticateToken');
const {
    createProfileCandidate,
    createProfileRecruiter,
    updateProfile,
    deleteProfileById,
    getProfileById,
} = require('../controllers/profileController');

const router = express.Router();

router.post('/candidate', authenticateToken, createProfileCandidate);
router.post('/recruiter', authenticateToken, createProfileRecruiter);
router.patch('', authenticateToken, updateProfile);
router.delete('/:profileId', authenticateToken, deleteProfileById);
router.get('/:profileId', getProfileById);

module.exports = router;
