const factory = require('./handlerFactory');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const Field = require('./../models/fieldModel');
const Document = require('./../models/documentModel');

exports.count = factory.count(Field);

exports.getAll = factory.getAll(Field);

exports.post = catchAsync(async (req, res, next) => {
    const doc = await Document.findById(req.body.documentId);
    if (!doc) {
        return next(new AppError('No parent document found with that ID', 404));
    }
    const newFld = await Field.create(req.body);
    res.status(201).json({
        status: 'success',
        data: {
            field: newFld
        }
    });
});

exports.get = factory.getOne(Field);

exports.patch = factory.updateOne(Field);

exports.delete = factory.deleteOne(Field);
