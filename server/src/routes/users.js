const { Router } = require('express');
const { userSignIn, userSignUp, userLogout } = require('../controllers/user');
const nonBlankUserData = require('../middlewares/nonBlankUserData');
const verifyToken = require('../middlewares/verifyToken');
const sendError = require('../utils');

const route = Router();

route.post('/api/users/login', nonBlankUserData, async (req, res) => {
  try {
    const usr = await userSignIn(req.body);
    res.status(200).send(usr);
  } catch (err) {
    sendError(err, res);
  }
});

route.post('/api/users/logout', verifyToken, async (req, res) => {
  try {
    await userLogout(req.id, req.token, req.body.all);
    res.status(200).send();
  } catch (err) {
    sendError(err, res);
  }
});

route.post('/api/users/reg', nonBlankUserData, async (req, res) => {
  try {
    await userSignUp(req.body);
    const login = await userSignIn(req.body);
    res.status(200).send(login);
  } catch (err) {
    sendError(err, res);
  }
});

module.exports = route;
