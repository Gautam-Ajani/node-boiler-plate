const httpStatus = require('http-status');
const passport = require('passport');
const APIError = require('../utils/APIError');

const { jwt } = require('../constants/messages.json');

const handleJWT = (req, res, next) => async (err, user, info) => {
  const error = err || info;
  if (error && error.name === 'TokenExpiredError') {
    error.message = jwt.expired;
  }

  const logIn = Promise.promisify(req.logIn);
  const apiError = new APIError({
    message: error ? error.message : 'Unauthorized',
    status: httpStatus.UNAUTHORIZED,
    stack: error ? error.stack : undefined,
  });

  try {
    logIn(user, { session: false });
  } catch (e) {
    return next(apiError);
  }

  req.user = user;

  return next();
};

exports.authorize = () => (req, res, next) => {
  passport.authenticate(
    'jwt', { session: false },
    handleJWT(req, res, next),
  )(req, res, next);
};
