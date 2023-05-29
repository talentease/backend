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
