const factory = require('./handlerFactory');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const Collection = require('./../models/collectionModel');
const Database = require('./../models/databaseModel');

exports.count = factory.count(Collection);

exports.post = catchAsync(async (req, res, next) => {
    const parent = await Database.findById(req.body.databaseId);
    if (!parent) {
        return next(new AppError('No parent database document found with that ID', 404));
    }
    const newCol = await Collection.create(req.body);
    res.status(201).json({
        status: 'success',
        data: {
            collection: newCol
        }
    });
});

exports.getAll = factory.getAll(Collection);

exports.get = factory.getOne(Collection);

exports.patch = factory.updateOne(Collection);

exports.delete = factory.deleteOne(Collection);
