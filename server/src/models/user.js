const { Schema, model } = require('mongoose');

const userSchema = Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true
    },
    tokens: {
      type: [{ type: String }]
    }
  },
  { collection: 'Users' }
);

const User = new model('User', userSchema);

module.exports = User;
