const { admin, db } = require('../config/firebaseAdmin');

exports.registerWithEmail = (req, res) => {
    const { email, password } = req.body;
    admin
        .auth()
        .createUser({
            email,
            password,
        })
        .then((userRecord) => {
           // store user details in firestore
            const user = {
                uid: userRecord.uid,
                email: userRecord.email,
                createdAt: new Date().toISOString(),
            };

            const userData = db.collection('users').doc(userRecord.uid).set(user);
            // error
            if (!userData) {
                res.status(500).json({ error: 'User registration failed' });
            }
            res.status(200).json({ message: 'User registered successfully' });
        })
        .catch((error) => {
            // Error occurred during user registration
            res.status(500).json({ error: 'User registration failed', details: error.message });
        });
};
exports.validateLogin = (req, res) => {
    const {token} = req.body;

    // validate token using firebase admin
    admin
        .auth()
        .verifyIdToken(token)
        .then((decodedToken) => {
            const uid = decodedToken.uid;
            // get user details from firestore
            db.collection('users').doc(uid).get()
                .then((doc) => {
                    if (!doc.exists) {
                        return res.status(404).json({ error: 'User not found' });
                    }
                    return res.status(200).json({ message: 'User logged in successfully', user: doc.data() });
                })
                .catch((error) => {
                    return res.status(500).json({ error: 'Error getting user', details: error.message });
                });
        })
        .catch((error) => {
            return res.status(500).json({ error: 'Error validating user', details: error.message });
        });
}

