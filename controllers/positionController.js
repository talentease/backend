const { responseError, responseSuccess } = require('../utils/responseHandler');
const PositionModel = require('../models/positionModel');
const ProfileModel = require('../models/profileModel');

const createPosition = async (req, res) => {
    const recruiterId = req.user.uid;
    const role = await ProfileModel.getRole(recruiterId);
    if (role === 'recruiter' || role === 'admin') {
        const {
            title, description, salary, type, deadline,
        } = req.body;
        const companyId = await ProfileModel.getCompany(recruiterId);
        const position = {
            companyId,
            title,
            description,
            salary,
            type,
            deadline,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
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
        return responseSuccess(res, positions, 'Positions retrieved successfully', 200);
    }
    return responseError(res, 'Positions retrieval failed', 500);
};

const getPositionById = async (req, res) => {
    const id = req.params.positionId;
    const position = await PositionModel.getPositionById(id);
    if (!position) {
        return responseError(res, 'Position not found', 404);
    }
    return responseSuccess(res, { id, ...position }, 'Position retrieved successfully', 200);
};

const updatePosition = async (req, res) => {
    const id = req.params.positionId;
    const recruiterId = req.user.uid;
    const role = await ProfileModel.getRole(recruiterId);
    if (role === 'recruiter' || role === 'admin') {
        const position = await PositionModel.getPositionById(id);
        if (position) {
            const companyID = await ProfileModel.getCompany(recruiterId);
            if (position.companyId !== companyID) {
                return responseError(res, 'Forbidden', 403);
            }
            const {
                title, description, salary, type, deadline,
            } = req.body;
            const newPosition = {
                title,
                description,
                salary,
                type,
                deadline,
                updatedAt: new Date().toISOString(),
            };
            const updatedPosition = await PositionModel.updatePosition(id, newPosition);
            if (updatedPosition) {
                return responseSuccess(res, { id, ...newPosition }, 'Position updated successfully', 200);
            }
            return responseError(res, 'Position update failed', 500);
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
        const position = await PositionModel.getPositionById(id);
        if (position) {
            const companyID = await ProfileModel.getCompany(recruiterId);
            if (position.companyId !== companyID) {
                return responseError(res, 'Forbidden', 403);
            }
            const deletedPosition = await PositionModel.deletePositionById(id);
            if (deletedPosition) {
                return responseSuccess(res, null, 'Position deleted successfully', 200);
            }
            return responseError(res, 'Position deletion failed', 500);
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
