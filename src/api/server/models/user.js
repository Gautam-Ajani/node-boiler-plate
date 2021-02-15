const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

mongoose.set('useCreateIndex', true);

/**
 * User Schema
 * @private
 */
const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    maxlength: 128,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    maxlength: 128,
  },
  email: {
    type: String,
    index: true,
    trim: true,
    maxlength: 128
  },
  password: {
    type: String,
    trim: true,
    maxlength: 128
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    trim: true,
  },
  city: {
    type: String,
    index: true,
    trim: true
  },
  hobby: {
    type: Array,
    trim: true,
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
});

UserSchema.pre('save', function (next) {
  let user = this;
  bcrypt.hash(user.password, 10, function (error, hash) {
    if (error) {
      return next(error);
    } else {
      user.password = hash;
      next();
    }
  });
});

module.exports = mongoose.model('User', UserSchema);
