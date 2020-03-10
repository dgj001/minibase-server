const factory = require('./handlerFactory');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const Document = require('../models/documentModel');
const Collection = require('../models/collectionModel');

exports.count = factory.count(Document);

exports.getAll = factory.getAll(Document);

exports.post = catchAsync(async (req, res, next) => {
    const col = await Collection.findById(req.body.collectionId);
    if (!col) {
        return next(new AppError('No parent collection document found with that ID', 404));
    }
    const newDoc = await Document.create(req.body);
    res.status(201).json({
        status: 'success',
        data: {
            document: newDoc
        }
    });
});

exports.get = factory.getOne(Document);

exports.patch = factory.updateOne(Document);

exports.delete = factory.deleteOne(Document);