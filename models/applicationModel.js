const { db } = require('../config/firebaseAdmin');

const collection = db.collection('applications');

class ApplicationModel {
    static async createApplication(data) {
        const newApplication = await collection.add(data);
        return newApplication;
    }

    static async getApplicationById(id) {
        const application = await collection.doc(id).get();
        if (application.exists) {
            return application;
        }
        return null;
    }

    static async getApplicationByPositionId(positionId) {
        const applications = await collection.where('positionId', '==', positionId).get();
        if (applications.empty) {
            return null;
        }
        const applicationList = [];
        applications.forEach((application) => {
            applicationList.push({ id: application.id, ...application.data() });
        });
        return applicationList;
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
