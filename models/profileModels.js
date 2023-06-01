/* eslint-disable no-param-reassign */
const { db } = require('../config/firebaseAdmin');

const profileModel = {
    async createProfileCandidate(profile) {
        const newProfile = await db.collection('users').doc(profile.uid).set(profile);
        return newProfile;
    },
    async getProfileById(profileId) {
        const profile = await db.collection('users').doc(profileId).get();
        return profile;
    },
    async getProfileByEmail(email) {
        const profile = await db.collection('users').where('email', '==', email).get();
        return profile;
    },
    async updateProfile(profile) {
        const updatedProfile = await db.collection('users').doc(profile.uid).set(profile);
        return updatedProfile;
    },
    async deleteProfile(profileId) {
        const deletedProfile = await db.collection('users').doc(profileId).delete();
        return deletedProfile;
    },
};

module.exports = profileModel;
