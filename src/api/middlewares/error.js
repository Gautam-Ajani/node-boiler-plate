const httpStatus = require('http-status');
const expressValidation = require('express-validation');
const APIError = require('../utils/APIError');
const { logger } = require('../../config/logger');
const moment = require('moment');

/**
 * Error handler. Send stacktrace only during development
 * @public
 */
const handler = (err, req, res) => {
  const response = {
    message: err.errors ? err.errors[0].messages[0].replace(/"/g, '') : err.message,
    isVerified: err.isVerified,
  };
  const stack = err.stack ? err.stack : '';
  logger.error(`${moment.utc().format('DD/MM/YYYY LTS')} ${response.message}\n ${stack}`);
  res.status(err.status);
  res.json(response);
};
exports.handler = handler;
/**
 * If error is not an instanceOf APIError, convert it.
 * @public
 */
exports.converter = (err, req, res) => {
  let convertedError = err;
  if (err instanceof expressValidation.ValidationError) {
    convertedError = new APIError({
      message: 'Validation Error',
      errors: err.errors,
      status: err.status,
      stack: err.stack,
    });
  } else if (!(err instanceof APIError)) {
    convertedError = new APIError({
      isVerified: err.isVerified,
      message: err.message,
      status: err.status,
      stack: err.stack,
    });
  }
  logger.error(':::::Error: Validation Error Or Other Bad Requests:::::', err);
  return handler(convertedError, req, res);
};
/**
 * Catch 404 and forward to error handler
 * @public
 */
exports.notFound = (req, res) => {
  const err = new APIError({
    message: 'Not found',
    status: httpStatus.NOT_FOUND,
  });
  return handler(err, req, res);
};
