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
    User.findOne({ where: { email }, raw: true })
      .then((user) => {
        if (!user) {
          return cb(null, false, {
            message: 'Incorrect email or password.'
          });
        }
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
    //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
    return User.findById(jwtPayload.id)
      .then((user) => {
        return cb(null, user);
      })
      .catch((err) => {
        return cb(err);
      });
  }
));
