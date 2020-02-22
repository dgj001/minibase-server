const express = require('express');
const router = express.Router();

const projectController = require('./../controllers/projectController');

router.route('/')
    .get(projectController.getAll)
    .post(projectController.post);

router.route('/:id')
    .get(projectController.get)
    .patch(projectController.patch)
    .delete(projectController.delete);

module.exports = router;