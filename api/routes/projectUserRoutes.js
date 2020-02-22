const express = require('express');
const router = express.Router();

const projectUserController = require('../controllers/projectUserController');

router.get('/', projectUserController.getAll);

router.post('/signup', projectUserController.signup);

module.exports = router;