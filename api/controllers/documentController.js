const mongoose = require('mongoose');

const Document = require('../models/documentModel');
const Collection = require('../models/collectionModel');

exports.count = (req, res, next) => {
    Document.countDocuments(req.query)
        .then(count => {
            res.status(200).json({
                status: '/documents/count GET successful',
                count
            })
        })
}

exports.getAll = (req, res, next) => {
    Document.find(req.query)
        .then(docs => {
            res.status(200).json({
                status: '/documents  GET successful',
                documents: docs
            });
        })
        .catch(error => {
            res.status(500).json({
                message: '/documents  GET failed',
            });
        });
}

exports.post = (req, res, next) => {
    Collection.findById(req.body.collectionId)
        .then(collection => {
            if (!collection) {
                return res.status(404).json({
                    status: '/documents  POST failed',
                    message: "Referenced collection not found"
                });
            }
            const doc = new Document({
                _id: new mongoose.Types.ObjectId(),
                name: req.body.name,
                collectionId: collection._id,
                createdAt: Date.now()
            });
            return doc.save();
        })
        .then(result => {
            res.status(201).json({
                status: '/documents  POST successful',
                createdDocument: result
            });
        })
        .catch(error => {
            res.status(500).json({
                status: '/documents  POST failed',
                message: error.message
            });
        });
}

exports.get = (req, res, next) => {
    const id = req.params.id;
    Document.findById(id)
        .then(doc => {
            if (doc) {
                res.status(200).json({
                    status: '/documents  GET:id successful',
                    document: doc
                });
            } else {
                res.status(404).json({
                    status: '/documents  GET:id failed'
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                status: '/documents  GET failed'
            });
        });
}

exports.patch = (req, res, next) => {
    const id = req.params.id;
    const doc = {
        name: req.body.name
    }
    Document.updateOne({ _id: id }, doc)
        .then(result => {
            res.status(200).json({
                status: '/documents  PATCH successful'
            });
        })
        .catch(error => {
            res.status(500).json({
                status: '/documents  PATCH failed'
            });
        });
}

exports.delete = (req, res, next) => {
    const id = req.params.id;
    Document.deleteOne({ _id: id })
        .then(result => {
            res.status(200).json({
                status: '/documents  DELETE successful'
            });
        })
        .catch(error => {
            res.status(500).json({
                status: '/documents  DELETE failed'
            });
        });
}