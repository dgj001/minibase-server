const express = require('express');
const router = express.Router();

const collectionController = require('./../controllers/collectionController');

router.get('/count', collectionController.count);

router.route('/')
    .get(collectionController.getAll)
    .post(collectionController.post);

router.route('/:id')
    .get(collectionController.get)
    .patch(collectionController.patch)
    .delete(collectionController.delete);

module.exports = router;