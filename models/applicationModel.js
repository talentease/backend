const { db } = require('../config/firebaseAdmin');

const collection = db.collection('applications');

class ApplicationModel {
    static async createApplication(data) {
        const newApplication = await collection.add(data);
        return newApplication;
    }

    static async getAllApplications() {
        const applications = await collection.get();
        return applications;
    }

    static async getApplicationById(id) {
        const application = await collection.doc(id).get();
        if (application.exists) {
            return application;
        }
        return null;
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
