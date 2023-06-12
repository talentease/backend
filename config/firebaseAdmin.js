const admin = require('firebase-admin');

// eslint-disable-next-line global-require,import/no-unresolved
const serviceAccount = process.env.SERVICE_ACCOUNT || require('./firebaseAdminKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.STORAGE_BUCKET,
});

const db = admin.firestore();

module.exports = { admin, db };
