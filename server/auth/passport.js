const config = require('../config/config');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../../models').User;

const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const bcrypt = require('bcrypt');

passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  (email, password, cb) => {
    // Sequelize will find the user with raw data returned
    User.findOne({where: {email},raw: true})
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
          message: 'Logged in successfully'
        });
      })
      .catch((err) => cb(err));
  }
));

passport.use('local-register', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, (email, password, cb) => {
  // Sequelize will find the user with raw data returned
  User.findOne({where: {email},raw: true})
    .then((user) => {
      if (user) {
        return cb(null, false, {
          message: 'The email is already registered.'
        });
      }
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      const userObj = {
        email,
        password: hash
      };

      User.create(userObj)
        .then((newUser) => {
          const dataObj = newUser.get({plain:true});
          return cb(null, dataObj, {
            message: 'User created successfully.'
          });
        })
        .catch((err) => {
          return cb(err);
        });
    })
    .catch((err) => cb(err));

}));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('Bearer'),
    secretOrKey: config.secrets.jwt
  },
  (jwtPayload, cb) => {
    // Use the JWT token to find the user in the db if required
    User.findOne({where: {email: jwtPayload.email},raw: true})
      .then((user) => {
        return cb(null, user);
      })
      .catch((err) => {
        return cb(err);
      });
  }
));
