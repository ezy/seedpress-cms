const config = require('../config/config');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../../models').User;

const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const bcrypt = require('bcrypt');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  (email, password, cb) => {
    // Sequelize will find the user with raw data returned
    User.findOne({ where: { email }, raw: true })
      .then((user) => {
        if (!user) {
          return cb(null, false, {
            message: 'Incorrect email or password.'
          });
        }
        // Don't forget bcrypt as passwords are encrypted
        if (!bcrypt.compareSync(password, user.password)) {
          return cb(null, false, {
            message: 'Incorrect email or password.'
          });
        }
        return cb(null, user, {
          message: 'Logged In Successfully'
        });
      })
      .catch((err) => cb(err));
  }
));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.secrets.jwt
  },
  (jwtPayload, cb) => {
    // Use the JWT token to find the user in the db if required
    return User.findOne({ where: { email: jwtPayload.email }, raw: true })
      .then((user) => {
        return cb(null, user);
      })
      .catch((err) => {
        return cb(err);
      });
  }
));
