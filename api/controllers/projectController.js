const mongoose = require('mongoose');

const Project = require('./../models/projectModel');

exports.getAll = (req, res, next) => {
    Project.find(req.query)
        .then(projects => {
            res.status(200).json({
                message: '/projects GET successful',
                projects
            });
        })
        .catch(error => {
            res.status(500).json({
                message: '/projects GET failed'
            });
        });
}

exports.post = (req, res, next) => {
    const project = new Project({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        userId: req.body.userId
    });
    project.save()
        .then(created => {
            res.status(200).json({
                message: '/projects POST successful',
                createdProject: created
            });
        })
        .catch(error => {
            res.status(500).json({
                message: '/projects POST failed'
            });
        });
}

exports.get = (req, res, next) => {
    const id = req.params.id;
    Project.findById(id)
        .then(proj => {
            if (proj) {
                res.status(200).json(proj);
            } else {
                res.status(404).json({
                    message: 'Project not found'
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: '/projects GET:id failed'
            });
        });
}

exports.patch = (req, res, next) => {
    const id = req.params.id;
    const project = {
        name: req.body.name,
    }
    Project.updateOne({ _id: id }, project)
        .then(result => {
            res.status(200).json({ message: '/projects PATCH successful' });
        })
        .catch(error => {
            res.status(500).json({
                message: '/projects PATCH failed'
            });
        });
}

exports.delete = (req, res, next) => {
    const id = req.params.id;
    Project.deleteOne({ _id: id })
        .then(result => {
            res.status(200).json({ message: '/pages DELETE successful' });
        })
        .catch(error => {
            res.status(500).json({
                message: '/pages DELETE failed'
            });
        });
}