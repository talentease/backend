const admin = require('firebase-admin');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];

    admin
        .auth()
        .verifyIdToken(token)
        .then((decodedToken) => {
            req.user = decodedToken;

            // Fetch the user role based on the user ID
            const userId = decodedToken.uid;
            return admin.firestore().collection('users').doc(userId).get();
        })
        .then((doc) => {
            if (doc.exists) {
                req.userRole = doc.data().role; // Add the user role to the request object
                next();
            } else {
                throw new Error('User document not found');
            }
        })
        .catch((error) => {
            console.error('Error verifying Firebase ID token:', error);
            return res.status(403).json({ error: 'Invalid token' });
        });
};

module.exports = authenticateToken;


module.exports = authenticateToken;