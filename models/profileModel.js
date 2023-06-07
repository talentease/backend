const { db } = require('../config/firebaseAdmin');

const collection = db.collection('users');

class ProfileModel {
    static async createProfile(id, data) {
        const newProfile = await collection.doc(id).set(data);
        return newProfile;
    }

    static async getProfileById(id) {
        const profile = await collection.doc(id).get();
        if (profile.exists) {
            return profile;
        }
        return null;
    }

    static async getProfileByEmail(email) {
        const profile = await collection.where('email', '==', email).get();
        if (profile.empty) {
            return null;
        }
        return profile;
    }

    static async updateProfile(id, data) {
        const profile = await collection.doc(id).get();
        if (profile.exists) {
            const updatedProfile = await collection.doc(id).set(data);
            return updatedProfile;
        }
        return null;
    }

    static async getRole(id) {
        const profile = await collection.doc(id).get();
        if (profile.exists) {
            return profile.data().role;
        }
        return null;
    }

    static async getCompany(id) {
        const profile = await collection.doc(id).get();
        if (profile.exists && (profile.data().role === 'recruiter' || profile.data().role === 'admin')) {
            return profile.data().companyID;
        }
        return null;
    }
}

module.exports = ProfileModel;
