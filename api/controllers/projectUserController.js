const mongoose = require('mongoose');
const factory = require('./handlerFactory');

const ProjectUser = require('../models/projectUserModel');
const Project = require('./../models/projectModel');

exports.getAll = factory.getAll(ProjectUser);

exports.signup = (req, res, next) => {
  Project.findById(req.body.projectId)
    .then(prj => {
      if (!prj) {
        return res.status(404).json({
          status: '/projectUsers POST failed',
          message: "Referenced project not found"
        });
      }
      const prjUser = new ProjectUser({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        password: req.body.password,
        projectId: prj._id,
        createdAt: Date.now()
      });
      return prjUser.save();
    })
    .then(newUser => {
      newUser.password = undefined;
      res.status(201).json({
        status: '/projectUsers POST successful',
        createdProjectUser: newUser
      });
    })
    .catch(error => {
      res.status(500).json({
        status: '/projectUsers POST failed',
        message: error.message
      });
    });
}
