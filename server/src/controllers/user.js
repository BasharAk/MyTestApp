const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ServerError = require('../utils/ServerError');

const generateAuthToken = async (user) => {
  const token = jwt.sign({ id: user._id.toString() }, 'mysecretkey', {
    expiresIn: 10
  });
  await user.updateOne({ $addToSet: { tokens: token } }); //$addToSet dont add if exist
  return token;
};

const generateUserInfo = (user) => {
  const { userName, email, _id } = user;
  return { id: _id, userName, email };
};

const userSignIn = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new ServerError({
      name: 'SigninError',
      message: 'Email provided not found',
      code: 409
    });
  } else {
    if (!(password === user.password)) {
      throw new ServerError({
        name: 'SigninError',
        message: 'Password does not match this email',
        code: 409
      });
    } else {
      const token = await generateAuthToken(user);
      return {
        ...generateUserInfo(user),
        token
      };
    }
  }
};

const userSignUp = async (userInfo) => {
  const existUser = await User.findOne({ email: userInfo.email });
  if (existUser) {
    throw new ServerError({
      name: 'SignupError',
      message: 'This Email is already used',
      code: 409
    });
  } else {
    const user = new User({ ...userInfo });
    await user.save();
  }
};

const userLogout = async (id, currentToken, all) => {
  const user = await User.findOne({ _id: id, tokens: `${currentToken}` });
  if (!user) {
    throw new ServerError({
      name: 'LogoutError',
      message: 'User not found',
      code: 409
    });
  } else {
    if (all) await user.updateOne({ _id: id, $set: { tokens: [] } });
    else await user.updateOne({ _id: id, $pull: { tokens: currentToken } });
  }
};

module.exports = {
  generateAuthToken,
  generateUserInfo,
  userSignIn,
  userSignUp,
  userLogout
};
