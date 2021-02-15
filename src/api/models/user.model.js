const User = require('../server/models/user');
const { logger } = require('../../config/logger');
const APIError = require('../utils/APIError');
const { userMessage } = require('../constants/messages.json');
const httpStatus = require('http-status');
const jwt = require('jwt-simple');
const moment = require('moment-timezone');
const {
  jwtSecret, jwtExpirationInterval
} = require('../../config/vars');
const bcrypt = require('bcryptjs');

module.exports.findByEmailId = async (email) => {
  try {
    logger.info('******** INFO :: user model :: findByEmailId ********');
    let userObj = await User.findOne({ email, isActive: true });
    return userObj;
  } catch (error) {
    logger.info('******** ERROR :: user model :: findByEmailId ********');
    logger.info(error);
    return error;
  }
};

module.exports.create = async (req) => {
  try {
    logger.info('******** INFO :: user model :: create ********');
    const user = new User(req.body);
    const savedUser = await user.save();
    return await this.transform(savedUser);
  } catch (error) {
    logger.info('******** ERROR :: user model :: create ********');
    logger.info(error);
    return error;
  }
};

module.exports.passwordMatches = async (password, savedPassword) =>
  bcrypt.compare(password, savedPassword);

module.exports.token = async (id) => {
  const payload = {
    exp: moment().add(jwtExpirationInterval, 'days').unix(),
    iat: moment().unix(),
    sub: id,
  };
  return jwt.encode(payload, jwtSecret);
};

module.exports.transform = async (user) => {
  const transformed = {};
  const fields = ['id', 'firstName', 'lastName', 'gender', 'city', 'hobby'];
  fields.forEach((field) => {
    transformed[field] = user[field];
  });
  return transformed;
};

module.exports.login = async (user, password) => {
  const err = {
    status: httpStatus.UNAUTHORIZED,
    isPublic: true,
  };
  if (password) {
    if (user && await this.passwordMatches(password, user.password)) {
      return { user: await this.transform(user), accessToken: await this.token(user.id) };
    }
    err.message = userMessage.invalidCredential;
  }
  throw new APIError(err);
};