const admin = require("firebase-admin");

const serviceAccount = require(process.env.SERVICE_ACCOUNT_PATH);

const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = { admin, db };
