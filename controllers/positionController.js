const { responseError, responseSuccess } = require('../utils/responseHandler');
const PositionModel = require('../models/positionModel');
const ProfileModel = require('../models/profileModel');

const createPosition = async (req, res) => {
    const recruiterId = req.user.uid;
    const role = await ProfileModel.getRole(recruiterId);
    if (role === 'recruiter' || role === 'admin') {
        const {
            title, description, location, salary, type, deadline,
        } = req.body;
        const position = {
            recruiterId,
            title,
            description,
            location,
            salary,
            type,
            deadline,
        };
        const newPosition = await PositionModel.createPosition(position);
        if (newPosition) {
            return responseSuccess(res, { id: newPosition.id, ...position }, 'Position created successfully', 201);
        }
        return responseError(res, 'Position creation failed', 500);
    }
    return responseError(res, 'Forbidden', 403);
};

const getAllPositions = async (req, res) => {
    const positions = await PositionModel.getAllPositions();
    if (positions) {
        const positionsList = [];
        positions.forEach((doc) => {
            positionsList.push({ id: doc.id, ...doc.data() });
        });
        return responseSuccess(res, positionsList, 'Positions retrieved successfully', 200);
    }
    return responseError(res, 'Positions retrieval failed', 500);
};

const getPositionById = async (req, res) => {
    const id = req.params.positionId;
    const position = await PositionModel.getPositionById(id);
    if (!position.exists) {
        return responseError(res, 'Position not found', 404);
    }
    return responseSuccess(res, { id: position.id, ...position.data() }, 'Position retrieved successfully', 200);
};

const updatePosition = async (req, res) => {
    const id = req.params.positionId;
    const recruiterId = req.user.uid;
    const role = await ProfileModel.getRole(recruiterId);
    if (role === 'recruiter' || role === 'admin') {
        const {
            title, description, location, salary, type, deadline,
        } = req.body;
        const position = {
            id,
            recruiterId,
            title,
            description,
            location,
            salary,
            type,
            deadline,
        };
        const updatedPosition = await PositionModel.updatePosition(id, position);
        if (updatedPosition) {
            return responseSuccess(res, { id: updatedPosition.id, ...position }, 'Position updated successfully', 200);
        }
        return responseError(res, 'Position not found', 404);
    }
    return responseError(res, 'Forbidden', 403);
};

const deletePosition = async (req, res) => {
    const id = req.params.positionId;
    const recruiterId = req.user.uid;
    const role = await ProfileModel.getRole(recruiterId);
    if (role === 'recruiter' || role === 'admin') {
        const deletedPosition = await PositionModel.deletePositionById(id);
        if (deletedPosition) {
            return responseSuccess(res, null, 'Position deleted successfully', 200);
        }
        return responseError(res, 'Position not found', 404);
    }
    return responseError(res, 'Forbidden', 403);
};

module.exports = {
    createPosition,
    getAllPositions,
    getPositionById,
    updatePosition,
    deletePosition,
};
