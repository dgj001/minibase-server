const express = require('express');
const router = express.Router();

const Field = require('./../controllers/fieldController');
const checkAuth = require('./../middleware/check-auth');

router.get('/count', Field.count);

router.get('/', Field.getAll);

router.post('/', Field.post);

router.get('/:id', Field.get);

router.patch('/:id', Field.patch);

router.delete('/:id', Field.delete);

module.exports = router;