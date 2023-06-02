const { admin } = require('../config/firebaseAdmin');
const { responseError, responseSuccess } = require('../utils/responseHandler');
const CompanyModel = require('../models/companyModel');
const ProfileModel = require('../models/profileModel');

const createCompanyAdmin = async (req, res) => {
    const {
        email,
        password,
        firstName,
        lastName,
        phoneNumber,
        companyName,
        companyAddress,
        companyDescription,
    } = req.body;
    const existingProfile = await ProfileModel.getProfileByEmail(email);
    if (!existingProfile.empty) {
        return responseError(res, 'Profile already exists', 422);
    }
    const createdUser = await admin.auth().createUser({
        email,
        password,
    });
    if (createdUser) {
        const company = {
            companyName,
            companyAddress,
            companyDescription,
        };
        const newCompany = await CompanyModel.createCompany(company);
        const user = {
            uid: createdUser.uid,
            email: createdUser.email,
            firstName,
            lastName,
            phoneNumber,
            role: 'admin',
            companyID: newCompany.id,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        const newAdmin = ProfileModel.createProfile(user);
        if (!newAdmin && !newCompany) {
            return responseError(res, 'Company admin registration failed', 500);
        }
        return responseSuccess(res, user, 'Company admin created successfully', 201);
    }
    return responseError(res, 'Company admin registration failed', 500);
};

module.exports = {
    createCompanyAdmin,
};
