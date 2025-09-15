const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = (req, res) => {
    mongodb
        .getDatabase()
        .db()
        .collection('contacts')
        .find({})
        .toArray()
        .then((contacts) => {
            res.status(200).json(contacts);   // Content-Type auto set by .json()
        })
        .catch((err) => {
            res.status(500).json({ message: 'Database error', error: String(err) });
        });
};

const getSingle = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid contact id to find a contact.');
    }
    const contactId = new ObjectId(req.params.id);
    mongodb
        .getDatabase()
        .db()
        .collection('contacts')
        .find({})
        .toArray()
        .then((contacts) => {
            res.status(200).json(contacts[0]);   // Content-Type auto set by .json()
        })
        .catch((err) => {
            res.status(500).json({ message: 'Database error', error: String(err) });
        });
};

const createContact = async (req, res) => {
    const contact = {
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthday: req.body.birthday,
        favoriteColor: req.body.favoriteColor
    }
    const response = await mongodb.getDatabase().db().collection('contacts').insertOne(contact);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the contact.');
    }
};

const updateContact = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid contact id to update a contact.');
    }
    const contactId = new ObjectId(req.params.id);
    const contact = {
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthday: req.body.birthday,
        favoriteColor: req.body.favoriteColor
    }

    const response = await mongodb
        .getDatabase()
        .db()
        .collection('contacts')
        .replaceOne({ _id: contactId }, contact);
    console.log(response);
    if (response.modifiedCount > 0) {
        res.status(204).end();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the contact.');
    }
};

const deleteContact = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid contact id to delete a contact.');
    }
    const contactId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('contacts').deleteOne({ _id: contactId }, true)
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
    }
};


module.exports = {
    getAll,
    getSingle,
    createContact,
    updateContact,
    deleteContact,
};