const express = require('express');
const router = express.Router();

const fieldController = require('./../controllers/fieldController');

router.get('/count', fieldController.count);

router.route('/')
    .get(fieldController.getAll)
    .post(fieldController.post);

router.route('/:id')
    .get(fieldController.get)
    .patch(fieldController.patch)
    .delete(fieldController.delete);

module.exports = router;