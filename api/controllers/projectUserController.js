const mongoose = require('mongoose');

const ProjectUser = require('../models/projectUserModel');
const Project = require('./../models/projectModel');

exports.getAll = (req, res, next) => {
  ProjectUser.find(req.query)
    .then(projectUsers => {
      res.status(200).json({
        status: '/projectUsers GET successful',
        projectUsers
      });
    })
    .catch(error => {
      res.status(500).json({
        message: '/projectUsers GET failed',
      });
    });
}

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
