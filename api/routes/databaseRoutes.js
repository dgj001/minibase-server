const express = require('express');
const router = express.Router();

const databaseController = require('./../controllers/databaseController');

router.route('/')
    .get(databaseController.getAll)
    .post(databaseController.post);

router.route('/:id')
    .get(databaseController.get)
    .patch(databaseController.patch)
    .delete(databaseController.delete);

module.exports = router;