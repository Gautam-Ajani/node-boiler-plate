const httpStatus = require('http-status');
const { userMessage } = require('../constants/messages.json');
const { logger } = require('../../config/logger');
const util = require('util');
const User = require('../models/user.model');

exports.create = async (req, res, next) => {
  try {
    logger.info(':::::::: INFO :: userController :: create user ::::::::')
    const { email } = req.body;
    let emailExisting = await User.findByEmailId(email);
    console.log('data :: ', emailExisting);
    
    if (emailExisting !== null) {
      res.status(httpStatus.CONFLICT)
      res.json({ message: util.format(userMessage.emailExist, email) });
    } else {
      const userObj = await User.create(req);
      logger.info(':::::::::: User Object :::::::::: ', userObj)
      res.status(httpStatus.CREATED);
      res.json({ message: userMessage.created, data: userObj })
    }
  } catch (error) {
    console.log('ERROR :: ', error);
    next(error);
  }
};
