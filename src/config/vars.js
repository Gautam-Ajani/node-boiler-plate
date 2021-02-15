const path = require('path');

// import .env variables
require('dotenv-safe').load({
  path: path.join(__dirname, '../../.env'),
  sample: path.join(__dirname, '../../.env.example'),
});

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  jwtSecret: 'bA2xcjpf8y5aSUFsNB2qN5yymUBSs6es3qHoFpGkec75RCeBb8cpKauGefw5qy4',
  jwtExpirationInterval: 7,
  mongo: {
    uri: process.env.MONGO_URI,
  },
  logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
  mailConfig: {
    email: process.env.EMAIL,
    password: process.env.PASSWORD,
  },
  frontend: {
    resetPassword: 'reset-password',
    frontendHost: process.env.FRONTEND_HOST,
    userLogin: '/login',
  }
};
