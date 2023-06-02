const express = require('express');

const authenticateToken = require('../middlewares/authenticateToken');
const {
    createPosition,
    getAllPositions,
    getPositionById,
    updatePosition,
    deletePosition,
} = require('../controllers/positionControllers');

const router = express.Router();

router.get('/:positionId', getPositionById);
router.get('', getAllPositions);
router.post('', authenticateToken, createPosition);
router.patch('/:positionId', authenticateToken, updatePosition);
router.delete('/:positionId', authenticateToken, deletePosition);

module.exports = router;
