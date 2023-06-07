const { db } = require('../config/firebaseAdmin');
const CompanyModel = require('./companyModel');

const collection = db.collection('positions');

class PositionModel {
    static async createPosition(data) {
        const newPosition = await collection.add(data);
        return newPosition;
    }

    static async getAllPositions() {
        const positions = await collection.get();
        const positionsData = positions.docs.map(async (position) => {
            const company = await position.data().companyID;
            const companyData = await CompanyModel.getCompanyById(company);
            const companyDetails = companyData.data();
            const positionDetails = position.data();
            return {
                id: position.id,
                ...positionDetails,
                company: companyDetails,
            };
        });
        return Promise.all(positionsData);
    }

    static async getPositionById(id) {
        const position = await collection.doc(id).get();
        if (position.exists) {
            const company = await position.data().companyID;
            const companyData = await CompanyModel.getCompanyById(company);
            if (!companyData) {
                return null;
            }
            const companyDetails = companyData.data();
            const positionDetails = position.data();
            return { ...positionDetails, company: companyDetails };
        }
        return null;
    }

    static async updatePosition(id, data) {
        const position = await collection.doc(id).get();
        if (position.exists) {
            const updatedPosition = await collection.doc(id).update(data);
            return updatedPosition;
        }
        return null;
    }

    static async deletePositionById(id) {
        const position = await collection.doc(id).get();
        if (position.exists) {
            const deletedPosition = await collection.doc(id).delete();
            return deletedPosition;
        }
        return null;
    }
}

module.exports = PositionModel;
