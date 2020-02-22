const factory = require('./handlerFactory');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/AppError');

const Database = require('./../models/databaseModel');
const Project = require('./../models/projectModel');

exports.getAll = factory.getAll(Database);

exports.post = catchAsync(async (req, res, next) => {
    const project = await Project.findById(req.body.projectId)
    if (!project) {
        return next(new AppError('No parent project found with that ID', 404));
    }
    const newDb = await Database.create(req.body);
    res.status(201).json({
        status: 'success',
        data: {
            database: newDb
        }
    });
});

exports.get = factory.getOne(Database);

exports.patch = factory.updateOne(Database);

exports.delete = factory.deleteOne(Database);
