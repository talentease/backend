const { admin } = require('../config/firebaseAdmin');
const { responseError, responseSuccess } = require('../utils/responseHandler');
const ApplicationModel = require('../models/applicationModel');
const PositionModel = require('../models/positionModel');

// eslint-disable-next-line consistent-return
const createApplication = async (req, res) => {
    const candidateId = req.user.uid;
    const { positionId } = req.body;
    if (positionId === undefined || req.file === undefined) {
        return responseError(res, 'Missing required fields', 400);
    }
    const position = await PositionModel.getPositionById(positionId);
    if (!position) {
        return responseError(res, 'Position not found', 404);
    }
    const { file } = req;
    const data = {
        candidateId,
        positionId,
        file,
    };
    try {
        const bucket = admin.storage().bucket();
        const filename = `${Date.now()}_${file.originalname}`;
        const fileUpload = bucket.file(filename);
        const stream = fileUpload.createWriteStream({
            metadata: {
                contentType: file.mimetype,
            },
        });
        stream.on('error', () => responseError(res, 'Error uploading file', 500));
        stream.on('finish', async () => {
            const newData = {
                candidateId: data.candidateId,
                positionId: data.positionId,
                status: 'pending', // 'pending', 'accepted', 'rejected
                cv: `https://storage.googleapis.com/${bucket.name}/${filename}`,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };
            const newApplication = await ApplicationModel.createApplication(newData);
            return responseSuccess(res, { id: newApplication.id, ...newData }, 'Application created successfully', 201);
        });
        stream.end(file.buffer);
    } catch (error) {
        return responseError(res, `Error creating application: ${error.message}`, 500);
    }
};

module.exports = {
    createApplication,
};
