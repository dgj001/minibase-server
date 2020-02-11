const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Header has for Bearer tokenstring
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY); // throws error if invalid token
    req.userData = { email: decodedToken.email, userId: decodedToken.userId };
    next();
  } catch (error) {
    res.status(401).json({
      message: 'Auth failed'
    });
  }
};
