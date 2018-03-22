const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

const config = require('../config/config');
const checkToken = expressJwt({
  secret: config.secrets.jwt
});
const User = require('../../models').User;

// Decode user's token
function decodeToken() {
  return (req, res, next) => {
    // [OPTIONAL]
    // make it optional to place token on query string
    // if it is, place it on the headers where it should be
    // so checkToken can see it. See follow the 'Bearer 034930493' format
    // so checkToken can see it and decode it
    if (req.query && req.query.hasOwnProperty('access_token')) {
      req.headers.authorization = `Bearer  ${req.query.access_token}`;
    }
    // this will call next if token is valid
    // and send error if it is not. It will attached
    // the decoded token to req.user
    return checkToken(req, res, next);
  };
}

// Set req.user to the authenticated user if JWT is valid & user is found in DB,
// otherwise return error
function getFreshUser() {
  return (req, res, next) => {
    User.findById(req.user._id)
      .then((user) => {
        if (!user) {
          // if no user is found it was not
          // it was a valid JWT but didn't decode
          // to a real user in our DB. Either the user was deleted
          // since the client got the JWT, or
          // it was a JWT from some other source
          return res.status(401).send({
            error: 'Unauthorized'
          });
        }
        // update req.user with fresh user from
        // stale token data
        req.user = user;
        return next();
      })
      .catch((err) => next(err));
  };
}

// Authenticate the user
function verifyUser() {
  return (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    // if no email or password then send
    if (!email || !password) {
      return res.status(400).send({
        error: 'Please enter a valid email and password'
      });
    }

    // look user up in the DB so we can check
    // if the passwords match for the email
    User.findAll({
        where: {
          email
        }
      })
      .then((user) => {
        if (!user[0]) {
          return res.status(401).send({
            error: 'Incorrect email or password'
          });
        }
        // checking the passowords
        if (!bcrypt.compareSync(password, user[0].password)) {
          return res.status(401).send({
            error: 'Incorrect Email or Password'
          });
        }
        // if everything is good,
        // then attach to req.user
        // and call next so the controller
        // can sign a token from the req.user._id
        req.user = user[0];
        return next();
      })
      .catch((err) => next(err));
  };
}

// Sign token on signup
function signToken(id) {
  return jwt.sign({
      id
    },
    config.secrets.jwt, {
      expiresIn: config.expireTime
    }
  );
}

module.exports = {
  decodeToken,
  getFreshUser,
  verifyUser,
  signToken
};
