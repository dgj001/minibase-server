const mongoose = require('mongoose');

const Database = require('./../models/databaseModel');
const Project = require('./../models/projectModel');

exports.getAll = async (req, res, next) => {
    Database.find(req.query)
        .then(databases => {
            res.status(200).json({
                message: '/databases GET successful',
                databases
            });
        })
        .catch(error => {
            res.status(500).json({
                message: '/databases GET failed'
            });
        });
}

exports.post = (req, res, next) => {
    Project.findById(req.body.projectId)
        .then(project => {
            if (!project) {
                return res.status(404).json({
                    message: "Referenced project not found"
                });
            }
            const database = new Database({
                _id: new mongoose.Types.ObjectId(),
                name: req.body.title,
                projectId: project._id
            });
            return database.save();
        })
        .then(result => {
            res.status(201).json({
                message: '/databases POST successful',
                createdDatabase: result
            });
        })
        .catch(error => {
            res.status(500).json({
                message: '/databases POST failed'
            });
        });
}

exports.get = (req, res, next) => {
    const id = req.params.id;
    Database.findById(id)
        .then(database => {
            if (database) {
                res.status(200).json(database);
            } else {
                res.status(404).json({ message: 'Database not found' });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: '/databases GET failed'
            });
        });
}

exports.patch = (req, res, next) => {
    const id = req.params.id;
    const database = {
        name: req.body.name
    }
    Database.updateOne({ _id: id }, database)
        .then(result => {
            res.status(200).json({ message: '/databases PATCH successful' });
        })
        .catch(error => {
            res.status(500).json({
                message: '/databases PATCH failed'
            });
        });
}

exports.delete = (req, res, next) => {
    const id = req.params.id;
    Database.deleteOne({ _id: id })
        .then(result => {
            res.status(200).json({ message: '/databases DELETE successful' });
        })
        .catch(error => {
            res.status(500).json({
                message: '/databases DELETE failed'
            });
        });
}