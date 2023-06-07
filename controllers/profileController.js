const { admin } = require('../config/firebaseAdmin');
const { responseError, responseSuccess } = require('../utils/responseHandler');
const ProfileModel = require('../models/profileModel');

const createProfileCandidate = async (req, res) => {
    const existingProfile = await ProfileModel.getProfileByEmail(req.user.email);
    if (existingProfile) {
        return responseError(res, 'Profile already exists', 422);
    }
    const { firstName, lastName, phoneNumber } = req.body;
    const profile = {
        email: req.user.email,
        firstName,
        lastName,
        phoneNumber,
        role: 'candidate',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };
    const newProfile = await ProfileModel.createProfile(req.user.uid, profile);
    if (!newProfile) {
        return responseError(res, 'Profile Candidate creation failed', 500);
    }
    return responseSuccess(res, { id: newProfile.id, ...profile }, 'Profile Candidate created successfully', 201);
};

const createProfileRecruiter = async (req, res) => {
    const {
        email, password, firstName, lastName, phoneNumber,
    } = req.body;
    const recruiterId = req.user.uid;
    const role = await ProfileModel.getRole(recruiterId);
    if (role === 'admin') {
        const existingProfile = await ProfileModel.getProfileByEmail(email);
        if (existingProfile) {
            return responseError(res, 'Profile already exists', 422);
        }
        const companyID = await ProfileModel.getCompany(recruiterId);
        const createdUser = await admin
            .auth()
            .createUser({
                email,
                password,
            });
        if (createdUser) {
            const user = {
                email: createdUser.email,
                firstName,
                lastName,
                phoneNumber,
                companyID,
                role: 'recruiter',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };
            const userData = ProfileModel.createProfile(createdUser.uid, user);
            if (!userData) {
                return responseError(res, 'Profile Recruiter creation failed', 500);
            }
            return responseSuccess(res, { id: userData.id, ...user }, 'Profile Recruiter created successfully', 201);
        }
        return responseError(res, 'Profile Recruiter creation failed', 500);
    }
    return responseError(res, 'Forbidden', 403);
};

const updateProfile = async (req, res) => {
    const existingProfile = await ProfileModel.getProfileById(req.user.uid);
    const { firstName, lastName, phoneNumber } = req.body;
    const profile = {
        email: req.user.email,
        firstName,
        lastName,
        phoneNumber,
        role: existingProfile.data().role,
        createdAt: existingProfile.data().createdAt,
        updateAt: new Date().toISOString(),
    };
    const updatedProfile = await ProfileModel.createProfile(req.user.uid, profile);
    if (!updatedProfile) {
        return responseError(res, 'Profile update failed', 500);
    }
    return responseSuccess(res, { id: updatedProfile.id, ...profile }, 'Profile updated successfully', 200);
};

const getProfileById = async (req, res) => {
    const profile = await ProfileModel.getProfileById(req.params.profileId);
    if (!profile) {
        return responseError(res, 'Profile not found', 404);
    }
    return responseSuccess(res, profile.data(), 'Profile retrieved successfully', 200);
};

module.exports = {
    createProfileCandidate,
    createProfileRecruiter,
    updateProfile,
    getProfileById,
};
