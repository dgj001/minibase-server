const mongoose = require('mongoose');

const Collection = require('./../models/collectionModel');
const Database = require('./../models/databaseModel');

exports.count = (req, res, next) => {
    Collection.countDocuments(req.query)
        .then(count => {
            res.status(200).json({
                status: '/collections/count GET successful',
                count
            })
        })
}

exports.getAll = (req, res, next) => {
    Collection.find(req.query)
        .then(cols => {
            res.status(200).json({
                status: '/collections GET successful',
                collections: cols
            });
        })
        .catch(error => {
            res.status(500).json({
                message: '/collections GET failed',
            });
        });
}

exports.post = (req, res, next) => {
    Database.findById(req.body.databaseId)
        .then(database => {
            if (!database) {
                return res.status(404).json({
                    status: '/collections POST failed',
                    message: "Referenced database not found"
                });
            }
            const col = new Collection({
                _id: new mongoose.Types.ObjectId(),
                name: req.body.name,
                databaseId: database._id,
                createdAt: Date.now()
            });
            return col.save();
        })
        .then(result => {
            res.status(201).json({
                status: '/collections POST successful',
                createdCollection: result
            });
        })
        .catch(error => {
            res.status(500).json({
                status: '/collections POST failed',
                message: error.message
            });
        });
}

exports.get = (req, res, next) => {
    const id = req.params.id;
    Collection.findById(id)
        .then(col => {
            if (col) {
                res.status(200).json({
                    status: '/collections GET:id successful',
                    collection: col
                });
            } else {
                res.status(404).json({
                    status: '/collections GET:id failed'
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                status: '/collections GET failed'
            });
        });
}

exports.patch = (req, res, next) => {
    const id = req.params.id;
    const col = {
        name: req.body.name
    }
    Collection.updateOne({ _id: id }, col)
        .then(result => {
            res.status(200).json({
                status: '/collections PATCH successful'
            });
        })
        .catch(error => {
            res.status(500).json({
                status: '/collections PATCH failed'
            });
        });
}

exports.delete = (req, res, next) => {
    const id = req.params.id;
    Collection.deleteOne({ _id: id })
        .then(result => {
            res.status(200).json({
                status: '/collections DELETE successful'
            });
        })
        .catch(error => {
            res.status(500).json({
                status: '/collections DELETE failed'
            });
        });
}