const { responseError, responseSuccess } = require('../utils/responseHandler');
const profileModel = require('../models/profileModels');

exports.createProfileCandidate = async (req, res) => {
    const existingProfile = await profileModel.getProfileByEmail(req.user.email);
    if (!existingProfile.empty) {
        return responseError(res, 'Profile already exists', 422);
    }
        const { // eslint-disable-next-line max-len
            firstName, lastName, phoneNumber, location,
        } = req.body;
        const profile = {
            email: req.user.email,
            uid: req.user.uid,
            firstName,
            lastName,
            phoneNumber,
            location,
            role: 'candidate',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        const newProfile = await profileModel.createProfileCandidate(profile);
        if (!newProfile) {
            return responseError(res, 'Profile creation failed', 500);
        }
        return responseSuccess(res, profile, 'Profile created successfully', 201);
};

exports.updateProfile = async (req, res) => {
    const existingProfile = await profileModel.getProfileById(req.user.uid);
    const { // eslint-disable-next-line max-len
        firstName, lastName, phoneNumber, location,
    } = req.body;
    const profile = {
        uid: req.user.uid,
        email: req.user.email,
        firstName,
        lastName,
        phoneNumber,
        location,
        role: existingProfile.data().role,
        createdAt: existingProfile.data().createdAt,
        updateAt: new Date().toISOString(),
    };
    const updatedProfile = await profileModel.updateProfile(profile);
    if (!updatedProfile) {
        return responseError(res, 'Profile update failed', 500);
    }
    return responseSuccess(res, profile, 'Profile updated successfully', 200);
};

exports.getProfileById = async (req, res) => {
    const profile = await profileModel.getProfileById(req.params.profileId);
    if (!profile.exists) {
        return responseError(res, 'Profile not found', 404);
    }
    return responseSuccess(res, profile.data(), 'Profile retrieved successfully', 200);
};

exports.deleteProfileById = async (req, res) => {
    const deletedProfile = await profileModel.deleteProfile(req.params.profileId);
    if (!deletedProfile) {
        return responseError(res, 'Profile deletion failed', 500);
    }
    return responseSuccess(res, null, 'Profile deleted successfully', 200);
};
