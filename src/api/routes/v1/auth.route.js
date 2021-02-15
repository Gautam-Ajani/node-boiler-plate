const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/auth.controller');
const {
  login,
} = require('../../validations/auth.validation');

const router = express.Router();

/**
 * @api {post} v1/auth/login Login
 * @apiDescription Get an accessToken
 * @apiVersion 1.0.0
 * @apiName Login
 * @apiGroup Auth
 * @apiPermission public
 *
 * @apiParam  {String}         email     User's email
 * @apiParam  {String}  password  User's password
 *
 * @apiSuccess  {String}  token.tokenType     Access Token's type
 *
 * @apiSuccess  {String}  user.id             User's id
 * @apiSuccess  {String}  user.firstName      User's firstName
 * @apiSuccess  {String}  user.lastName       User's  lastName
 * @apiSuccess  {String}  user.email          User's email
 * @apiSuccess  {String}  user.gender         User's gender
 * @apiSuccess  {String}  user.city           User's city
 * @apiSuccess  {Array}   user.hobby          User's bobby
 *
 * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
 * @apiError (Unauthorized 401)  Unauthorized     Incorrect email or password
 */
router.route('/login')
  .post(validate(login), controller.login);


module.exports = router;
