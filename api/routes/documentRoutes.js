const express = require('express');
const router = express.Router();

const Document = require('./../controllers/documentController');
const checkAuth = require('./../middleware/check-auth');

router.get('/count', Document.count);

router.get('/', Document.getAll);

router.post('/', Document.post);

router.get('/:id', Document.get);

router.patch('/:id', Document.patch);

router.delete('/:id', Document.delete);

module.exports = router;