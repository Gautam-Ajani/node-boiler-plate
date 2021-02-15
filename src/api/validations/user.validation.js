const Joi = require('joi');

module.exports = {

  // POST /v1/users
  createUser: {
    body: {
      email: Joi.string().email().required().label('Email'),
      firstName: Joi.string().required().label('First Name'),
      lastName: Joi.string().required().label('Last Name'),
      gender: Joi.string().valid('male', 'female', 'other'),
      password: Joi.string().min(6).max(128).required().label('Password'),
      city: Joi.string().label('City'),
    },
  }
}