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
const app = express();

router.get('/:positionId', getPositionById);
router.get('', getAllPositions);
router.post('', authenticateToken, createPosition);
router.put('/:positionId', authenticateToken, updatePosition);
router.delete('/:positionId', authenticateToken, deletePosition);

module.exports = router;
