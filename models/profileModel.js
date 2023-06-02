const { db } = require('../config/firebaseAdmin');

const collection = db.collection('users');

class ProfileModel {
    static async createProfileCandidate(profile) {
        const newProfile = await collection.doc(profile.uid).set(profile);
        return newProfile;
    }

    static async getProfileById(profileId) {
        const profile = await collection.doc(profileId).get();
        return profile;
    }

    static async getProfileByEmail(email) {
        const profile = await collection.where('email', '==', email).get();
        return profile;
    }

    static async updateProfile(profile) {
        const updatedProfile = await collection.doc(profile.uid).set(profile);
        return updatedProfile;
    }

    static async deleteProfile(profileId) {
        const deletedProfile = await collection.doc(profileId).delete();
        return deletedProfile;
    }

    static async getRole(profileId) {
        const profile = await collection.doc(profileId).get();
        if (profile.exists) {
            return profile.data().role;
        }
        return null;
    }
}

module.exports = ProfileModel;
