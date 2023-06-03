const { admin, db } = require('../config/firebaseAdmin');
const { responseSuccess, responseError } = require('../utils/responseHandler');

const registerWithEmail = (req, res) => {
    const { email, password } = req.body;
    admin
        .auth()
        .createUser({
            email,
            password,
        })
        .then((userRecord) => {
            const user = {
                email: userRecord.email,
                createdAt: new Date().toISOString(),
            };
            const userData = db.collection('users').doc(userRecord.uid).set(user);
            if (!userData) {
                return responseError(res, 'User registration failed', 500);
            }
            return responseSuccess(res, user, 'User registered successfully', 201);
        })
        .catch((error) => responseError(res, error.message, 400));
};

module.exports = {
    registerWithEmail,
};
