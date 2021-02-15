const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/user.controller');
const {
  createUser
} = require('../../validations/user.validation');

const router = express.Router();



router
  .route('/')
  /**
   * @api {post} v1/user Create 
   * @apiDescription Create a new user
   * @apiVersion 1.0.0
   * @apiName CreateUser
   * @apiGroup user
   * @apiPermission admin
   *
   * @apiParam  {String}        email     user's email
   * @apiParam  {String}        firstName user's firstName
   * @apiParam  {String}        lastName  user's lastName
   * @apiParam  {String}        gender    user's gender
   * @apiParam  {String}        password  user's password
   * @apiParam  {String}        city      user's city
   * @apiParam  {Array}         hobby     user's hobby
   *
   * @apiSuccess (Created 201) {String}  id         user's id
   * @apiSuccess (Created 201) {String}  firstName  user's firstName
   * @apiSuccess (Created 201) {String}  laName     user's lastName
   * @apiSuccess (Created 201) {String}  email      user's email
   * @apiSuccess (Created 201) {String}  gender     user's gender
   * @apiSuccess (Created 201) {String}  city       user's city
   * @apiSuccess (Created 201) {Array}   hobby      user's hobby
   *
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   */
  .post(validate(createUser), controller.create);

module.exports = router;
