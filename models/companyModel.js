const { db } = require('../config/firebaseAdmin');

const collection = db.collection('companies');

class CompanyModel {
    static async createCompany(data) {
        const newCompany = await collection.add(data);
        return newCompany;
    }

    static async getAllCompanies() {
        const companies = await collection.get();
        return companies;
    }

    static async getCompanyById(id) {
        const company = await collection.doc(id).get();
        return company;
    }

    static async updateCompany(id, data) {
        const company = await collection.doc(id).get();
        if (company.exists) {
            const updatedCompany = await collection.doc(id).update(data);
            return updatedCompany;
        }
        return null;
    }

    static async deleteCompanyById(id) {
        const company = await collection.doc(id).get();
        if (company.exists) {
            const deletedCompany = await collection.doc(id).delete();
            return deletedCompany;
        }
        return null;
    }
}

module.exports = CompanyModel;
