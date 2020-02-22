const factory = require('./handlerFactory');

const Project = require('./../models/projectModel');

exports.getAll = factory.getAll(Project);

exports.post = factory.createOne(Project);

exports.get = factory.getOne(Project);

exports.patch = factory.updateOne(Project);

exports.delete = factory.deleteOne(Project);