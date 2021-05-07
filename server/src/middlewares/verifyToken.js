const jwt = require('jsonwebtoken');
const sendError = require('../utils');
const User = require('../models/user');

const verifyToken = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, 'mysecretkey');
    await User.findOne({ _id: decoded.id, tokens: `${token}` });
    req.token = token;
    req.id = decoded.id;
    next();
  } catch (err) {
    sendError(
      /*{
        message: err.message,
        code: 400
      },*/
      err,
      res
    );
  }
};

module.exports = verifyToken;
