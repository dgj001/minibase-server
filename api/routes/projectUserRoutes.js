const express = require('express');
const router = express.Router();

const projectUser = require('../controllers/projectUserController');

router.get('/', projectUser.getAll);

router.post('/signup', projectUser.signup);

module.exports = router;