const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel');

const signToken = (email, userId) => {
  return jwt.sign(
    { email: email, userId: userId },
    process.env.JWT_KEY,
    { expiresIn: '1h' }
  );
}

exports.signup = (req, res, next) => {
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    email: req.body.email,
    password: req.body.password
  });
  user.save()
    .then(result => {
      const token = signToken(result.email, result._id);
      res.status(201).json({
        message: 'User created',
        result,
        token
      })
    })
    .catch(err => {
      res.status(500).json({
        message: 'Invalid authentication credentials'
      });
    });
}

exports.login = (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: 'Auth failed'
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: 'Auth failed'
        });
      }
      const token = signToken(fetchedUser.email, fetchedUser._id);
      res.status(200).json({
        token,
        expiresIn: 3600, // seconds
        userId: fetchedUser._id
      });
    })
    .catch(err => {
      console.log(err);
      return res.status(401).json({
        message: 'Invalid authentication credentials'
      });
    });
}
