const express = require('express');

const User = require('../controllers/userController');

const router = express.Router();

router.post('/signup', User.signup);

router.post('/login', User.login);

module.exports = router;
