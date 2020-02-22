const express = require('express');
const router = express.Router();

const documentController = require('./../controllers/documentController');

router.get('/count', documentController.count);

router.route('/')
    .get(documentController.getAll)
    .post(documentController.post);

router.route('/:id')
    .get(documentController.get)
    .patch(documentController.patch)
    .delete(documentController.delete);

module.exports = router;