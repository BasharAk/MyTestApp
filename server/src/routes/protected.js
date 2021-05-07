const { Router } = require('express');
const verifyToken = require('../middlewares/verifyToken');
const sendError = require('../utils');

const route = new Router();

route.get('/api/protected', verifyToken, (req, res) => {
  try {
    res.status(200).send('accepted');
  } catch (err) {
    sendError(err, res);
  }
});

module.exports = route;
