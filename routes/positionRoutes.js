const express = require('express');

const authenticateToken = require('../middlewares/authenticateToken');
const {
    createPosition,
    getAllPositions,
    getPositionById,
    getPositionByCompanyId,
    updatePosition,
    deletePosition,
} = require('../controllers/positionController');

const router = express.Router();

router.get('/:positionId', getPositionById);
router.get('', getAllPositions);
router.get('/company/:companyId', getPositionByCompanyId);
router.post('', authenticateToken, createPosition);
router.patch('/:positionId', authenticateToken, updatePosition);
router.delete('/:positionId', authenticateToken, deletePosition);

module.exports = router;
