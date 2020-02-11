const mongoose = require('mongoose');

const Field = require('./../models/fieldModel');
const Document = require('./../models/documentModel');

exports.count = (req, res, next) => {
    Field.countDocuments(req.query)
        .then(count => {
            res.status(200).json({
                status: '/fields/count GET successful',
                count
            })
        })
}

exports.getAll = (req, res, next) => {
    Field.find(req.query)
        .then(flds => {
            res.status(200).json({
                status: '/fields GET successful',
                fields: flds
            });
        })
        .catch(error => {
            res.status(500).json({
                message: '/fields GET failed',
            });
        });
}

exports.post = (req, res, next) => {
    Document.findById(req.body.documentId)
        .then(doc => {
            if (!doc) {
                console.log('did not find doc');
                return res.status(404).json({
                    status: '/fields POST failed',
                    message: "Referenced document not found"
                });
            }
            console.log(doc._id);
            const fld = new Field({
                _id: new mongoose.Types.ObjectId(),
                name: req.body.name,
                value: req.body.value,
                documentId: doc._id,
                createdAt: Date.now()
            });
            return fld.save();
        })
        .then(result => {
            res.status(201).json({
                status: '/fields POST successful',
                createdField: result
            });
        })
        .catch(error => {
            res.status(500).json({
                status: '/fields POST failed',
                message: error.message
            });
        });
}

exports.get = (req, res, next) => {
    const id = req.params.id;
    Field.findById(id)
        .then(fld => {
            if (fld) {
                res.status(200).json({
                    status: '/fields GET:id successful',
                    field: fld
                });
            } else {
                res.status(404).json({
                    status: '/fields GET:id failed'
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                status: '/fields GET failed'
            });
        });
}

exports.patch = (req, res, next) => {
    const id = req.params.id;
    const fld = {
        name: req.body.name,
        value: req.body.value
    }
    Field.updateOne({ _id: id }, fld)
        .then(result => {
            res.status(200).json({
                status: '/fields PATCH successful'
            });
        })
        .catch(error => {
            res.status(500).json({
                status: '/fields PATCH failed'
            });
        });
}

exports.delete = (req, res, next) => {
    const id = req.params.id;
    Field.deleteOne({ _id: id })
        .then(result => {
            res.status(200).json({
                status: '/fields DELETE successful'
            });
        })
        .catch(error => {
            res.status(500).json({
                status: '/fields DELETE failed'
            });
        });
}