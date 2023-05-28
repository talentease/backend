const express = require('express');
const {
    createPosition,
    getAllPositions,
    getPositionById,
    updatePosition,
    deletePosition,
} = require('../controllers/positionControllers');

const router = express.Router();
router.post('', createPosition);
router.get('', getAllPositions);
router.get('/:positionId', getPositionById);
router.put('/:positionId', updatePosition);
router.delete('/:positionId', deletePosition);

module.exports = router;
