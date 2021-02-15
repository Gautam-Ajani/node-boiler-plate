const nodemailer = require('nodemailer');
const { mailConfig } = require('../../../config/vars');

module.exports.mailService = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: mailConfig.email,
    pass: mailConfig.password,
  },
});
