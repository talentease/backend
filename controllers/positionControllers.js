const { db } = require('../config/firebaseAdmin');

const position = db.collection('positions');

const createPosition = (req, res) => {
    const {
        recruiterId, title, description, location, salary, type, deadline,
    } = req.body;
    const newPosition = {
        recruiterId, title, description, location, salary, type, deadline,
    };
    position.add(newPosition)
        .then((doc) => {
            res.status(200).json({ message: 'Position created successfully', id: doc.id });
        })
        .catch((error) => {
            res.status(500).json({ error: 'Error creating position', details: error.message });
        });
};

const getAllPositions = (req, res) => {
    position.get()
        .then((snapshot) => {
            const positions = [];
            snapshot.forEach((doc) => {
                positions.push({ id: doc.id, ...doc.data() });
            });
            res.status(200).json(positions);
        })
        .catch((error) => {
            res.status(500).json({ error: 'Error getting positions', details: error.message });
        });
};

const getPositionById = (req, res) => {
    const id = req.params.positionId;
    position.doc(id).get()
        .then((doc) => {
            if (doc.exists) {
                res.status(200).json({ id: doc.id, ...doc.data() });
            } else {
                res.status(404).json({ error: 'Position not found' });
            }
        })
        .catch((error) => {
            res.status(500).json({ error: 'Error getting position', details: error.message });
        });
};

const updatePosition = (req, res) => {
    const id = req.params.positionId;
    const {
        recruiterId, title, description, location, salary, type, deadline,
    } = req.body;
    const updatedPosition = {
        recruiterId, title, description, location, salary, type, deadline,
    };
    position.doc(id).update(updatedPosition)
        .then(() => {
            res.status(200).json({ message: 'Position updated successfully' });
        })
        .catch((error) => {
            res.status(500).json({ error: 'Error updating position', details: error.message });
        });
};

const deletePosition = (req, res) => {
    const id = req.params.positionId;
    position.doc(id).delete()
        .then(() => {
            res.status(200).json({ message: 'Position deleted successfully' });
        })
        .catch((error) => {
            res.status(500).json({ error: 'Error deleting position', details: error.message });
        });
};

module.exports = {
    createPosition,
    getAllPositions,
    getPositionById,
    updatePosition,
    deletePosition,
};
