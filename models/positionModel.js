const { db } = require('../config/firebaseAdmin');

const collection = db.collection('positions');

class PositionModel {
    static async createPosition(data) {
        const newPosition = await collection.add(data);
        return newPosition;
    }

    static async getAllPositions() {
        const positions = await collection.get();
        return positions;
    }

    static async getPositionById(id) {
        const position = await collection.doc(id).get();
        return position;
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
