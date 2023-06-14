const { db } = require('../config/firebaseAdmin');
const PositionModel = require('./positionModel');
const ProfileModel = require('./profileModel');

const collection = db.collection('applications');

class ApplicationModel {
    static async createApplication(data) {
        const newApplication = await collection.add(data);
        return newApplication;
    }

    static async getApplicationById(id) {
        const application = await collection.doc(id).get();
        if (application.exists) {
            const position = await application.data().positionId;
            const positionData = await PositionModel.getPositionById(position);
            const candidate = await application.data().candidateId;
            const candidateData = await ProfileModel.getProfileById(candidate);
            const candidateDetails = candidateData.data();
            const applicationDetails = application.data();
            return {
                id: application.id,
                ...applicationDetails,
                candidate: candidateDetails,
                position: positionData,
            };
        }
        return null;
    }

    static async getApplicationByPositionId(positionId) {
        const applications = await collection.where('positionId', '==', positionId).get();
        if (applications.empty) {
            return null;
        }
        const applicationsData = applications.docs.map(async (application) => {
            const position = await application.data().positionId;
            const positionData = await PositionModel.getPositionById(position);
            const candidate = await application.data().candidateId;
            const candidateData = await ProfileModel.getProfileById(candidate);
            const candidateDetails = candidateData.data();
            const applicationDetails = application.data();
            return {
                id: application.id,
                ...applicationDetails,
                candidate: candidateDetails,
                position: positionData,
            };
        });
        return Promise.all(applicationsData);
    }

    static async getApplicationByCandidateId(candidateId) {
        const applications = await collection.where('candidateId', '==', candidateId).get();
        if (applications.empty) {
            return null;
        }
        const applicationsData = applications.docs.map(async (application) => {
            const position = await application.data().positionId;
            const positionData = await PositionModel.getPositionById(position);
            const candidate = await application.data().candidateId;
            const candidateData = await ProfileModel.getProfileById(candidate);
            const candidateDetails = candidateData.data();
            const applicationDetails = application.data();
            return {
                id: application.id,
                ...applicationDetails,
                candidate: candidateDetails,
                position: positionData,
            };
        });
        return Promise.all(applicationsData);
    }

    static async updateApplication(id, data) {
        const application = await collection.doc(id).get();
        if (application.exists) {
            const updatedApplication = await collection.doc(id).update(data);
            return updatedApplication;
        }
        return null;
    }
}

module.exports = ApplicationModel;
