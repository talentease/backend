const { db } = require('../config/firebaseAdmin');

const collection = db.collection('users');

class ProfileModel {
    static async createProfile(data) {
        const newProfile = await collection.doc(data.uid).set(data);
        return newProfile;
    }

    static async getProfileById(id) {
        const profile = await collection.doc(id).get();
        return profile;
    }

    static async getProfileByEmail(email) {
        const profile = await collection.where('email', '==', email).get();
        return profile;
    }

    static async updateProfile(data) {
        const profile = await collection.doc(data.uid).get();
        if (profile.exists) {
            const updatedProfile = await collection.doc(data.uid).set(data);
            return updatedProfile;
        }
        return null;
    }

    static async deleteProfile(id) {
        const profile = await collection.doc(id).get();
        if (profile.exists) {
            const deletedProfile = await collection.doc(id).delete();
            return deletedProfile;
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
}

module.exports = ProfileModel;
