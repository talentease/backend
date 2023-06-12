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
    if (existingProfile) {
        return responseError(res, 'Profile already exists', 422);
    }
    const createdUser = await admin
        .auth()
        .createUser({
            email,
            password,
        });
    if (createdUser) {
        const company = {
            name: companyName,
            address: companyAddress,
            description: companyDescription,
            slug: companyName.toLowerCase().replace(/ /g, '-'),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        const newCompany = await CompanyModel.createCompany(company);
        const user = {
            email: createdUser.email,
            firstName,
            lastName,
            phoneNumber,
            role: 'admin',
            companyID: newCompany.id,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        const newAdmin = ProfileModel.createProfile(createdUser.uid, user);
        if (!newAdmin || !newCompany) {
            return responseError(res, 'Company Admin registration failed', 500);
        }
        return responseSuccess(res, { id: createdUser.uid, ...user }, 'Company Admin registered successfully', 201);
    }
    return responseError(res, 'Company Admin registration failed', 500);
};

module.exports = {
    createCompanyAdmin,
};
