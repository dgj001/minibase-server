const express = require('express');
const router = express.Router();

const Collection = require('./../controllers/collectionController');
const checkAuth = require('../middleware/check-auth');

router.get('/count', Collection.count);

router.get('/', Collection.getAll);

router.post('/', Collection.post);

router.get('/:id', Collection.get);

router.patch('/:id', Collection.patch);

router.delete('/:id', Collection.delete);

module.exports = router;