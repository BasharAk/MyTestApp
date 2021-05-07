const sendError = require('../utils');
const ServerError = require('../utils/ServerError');

const nonBlankUserData = (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password)
      throw new ServerError({
        name: 'UsernameAndPasswordVerficationError',
        message: 'Email and password must be provided',
        code: 400
      });
    else next();
  } catch (err) {
    sendError(err, res);
  }
};

module.exports = nonBlankUserData;
