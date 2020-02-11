const express = require('express');
const router = express.Router();

const Database = require('./../controllers/databaseController');
const checkAuth = require('.././middleware/check-auth');

router.get('/', Database.getAll);

router.post('/', Database.post);

router.get('/:id', Database.get);

router.patch('/:id', Database.patch);

router.delete('/:id', Database.delete);

module.exports = router;