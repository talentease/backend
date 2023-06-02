const { admin } = require('../config/firebaseAdmin');
const { responseError, responseSuccess } = require('../utils/responseHandler');
const ProfileModel = require('../models/profileModel');

const createProfileCandidate = async (req, res) => {
    const existingProfile = await ProfileModel.getProfileByEmail(req.user.email);
    if (!existingProfile.empty) {
        return responseError(res, 'Profile already exists', 422);
    }
    const { firstName, lastName, phoneNumber } = req.body;
    const profile = {
        email: req.user.email,
        uid: req.user.uid,
        firstName,
        lastName,
        phoneNumber,
        role: 'candidate',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };
    const newProfile = await ProfileModel.createProfile(profile);
    if (!newProfile) {
        return responseError(res, 'Profile creation failed', 500);
    }
    return responseSuccess(res, profile, 'Profile created successfully', 201);
};

const createProfileRecruiter = async (req, res) => {
    const {
        email, password, firstName, lastName, phoneNumber,
    } = req.body;
    const recruiterId = req.user.uid;
    const role = await ProfileModel.getRole(recruiterId);
    if (role === 'admin') {
        const existingProfile = await ProfileModel.getProfileByEmail(email);
        if (!existingProfile.empty) {
            return responseError(res, 'Profile already exists', 422);
        }
        const createdUser = await admin
            .auth()
            .createUser({
                email,
                password,
            });
        if (createdUser) {
            const user = {
                uid: createdUser.uid,
                email: createdUser.email,
                firstName,
                lastName,
                phoneNumber,
                role: 'recruiter',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };
            const userData = ProfileModel.createProfile(user);
            if (!userData) {
                return responseError(res, 'User registration failed', 500);
            }
            return responseSuccess(res, user, 'User registered successfully', 201);
        }
        return responseError(res, 'User registration failed', 500);
    }
    return responseError(res, 'Forbidden', 403);
};

const updateProfile = async (req, res) => {
    const existingProfile = await ProfileModel.getProfileById(req.user.uid);
    const { firstName, lastName, phoneNumber } = req.body;
    const profile = {
        uid: req.user.uid,
        email: req.user.email,
        firstName,
        lastName,
        phoneNumber,
        role: existingProfile.data().role,
        createdAt: existingProfile.data().createdAt,
        updateAt: new Date().toISOString(),
    };
    const updatedProfile = await ProfileModel.updateProfile(profile);
    if (!updatedProfile) {
        return responseError(res, 'Profile update failed', 500);
    }
    return responseSuccess(res, profile, 'Profile updated successfully', 200);
};

const getProfileById = async (req, res) => {
    const profile = await ProfileModel.getProfileById(req.params.profileId);
    if (!profile.exists) {
        return responseError(res, 'Profile not found', 404);
    }
    return responseSuccess(res, profile.data(), 'Profile retrieved successfully', 200);
};

const deleteProfileById = async (req, res) => {
    const deletedProfile = await ProfileModel.deleteProfile(req.params.profileId);
    if (!deletedProfile) {
        return responseError(res, 'Profile deletion failed', 500);
    }
    return responseSuccess(res, null, 'Profile deleted successfully', 200);
};

module.exports = {
    createProfileCandidate,
    createProfileRecruiter,
    updateProfile,
    getProfileById,
    deleteProfileById,
};
