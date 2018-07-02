const jwt = require('jsonwebtoken');
const passport = require('passport');
const config = require('../config/config');

const validateEmail = require('../utils/helpers.js').validateEmail;
const validatePassword = require('../utils/helpers.js').validatePassword;

function signToken(req, res, err, user, info) {
  if (err || !user) {
    return res.status(400).json({
      message: info.message
    });
  }
  req.login(user, { session: false }, (error) => {
    if (error) {
      return res.send(error);
    }
    // generate a signed son web token with the contents of user object and return it in the response
    const token = jwt.sign(user, config.secrets.jwt, { expiresIn: 86400 * 30 });
    // Use to ensure token is valid and debug non-working bearer
    // jwt.verify(token, config.secrets.jwt, (errs, data) => {
    //   console.log(errs, data);
    // });
    return res.json({
      user,
      message: info.message,
      token
    });
  });
}

function verifyUser(req, res /*, next*/) {
  passport.authenticate('local-login', { session: false }, (err, user, info) => {
    signToken(req, res, err, user, info);
  })(req, res);
}

// Register new user
function registerUser(req, res) {
  const email = req.body.email ? req.body.email.trim() : '';
  const password = req.body.password ? req.body.password.trim() : '';

  if (!email || !password) {
    return res
      .status(422)
      .send({ error: 'Email, and password are required.' });
  }

  const emailValidationError = validateEmail(email);
  if (emailValidationError.length > 0) {
    return res
      .status(400)
      .send({ error: emailValidationError }); // array of errors
  }

  const passwordValidationError = validatePassword(password);
  if (passwordValidationError.length > 0) {
    return res
      .status(400)
      .send({ error: passwordValidationError });
  }

  passport.authenticate('local-register', { session: false }, (err, user, info) => {
    signToken(req, res, err, user, info);
  })(req, res);
}

module.exports = {
  verifyUser,
  registerUser
};
