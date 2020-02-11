const express = require('express');
const router = express.Router();

const Project = require('./../controllers/projectController');
const checkAuth = require('./../middleware/check-auth');

router.get('/', Project.getAll);

router.post('/', Project.post);

router.get('/:id', Project.get);

router.patch('/:id', Project.patch);

router.delete('/:id', Project.delete);

module.exports = router;