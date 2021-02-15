const httpStatus = require('http-status');
const User = require('../models/user.model');
const util = require('util');
const { userMessage } = require('../constants/messages.json');


/**
 * Returns jwt token if valid username and password is provided
 * @public
 */
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let userObj = await User.findByEmailId(email)
    if (userObj.length === 0) {
      res.status(httpStatus.NOT_FOUND)
      res.json({ message: util.format(userMessage.notExist, email) });
    } else {
      const { user, accessToken } = await User.login(userObj, password)
      res.status(httpStatus.OK);
      return res.json({ accessToken, data: user });
    }
  } catch (error) {
    return next(error);
  }
};
