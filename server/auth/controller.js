const jwt = require('jsonwebtoken');
const passport = require('passport');
const config = require('../config/config');

function verifyUser(req, res /*, next*/) {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: info.message,
        user: user
      });
    }
    req.login(user, { session: false }, (error) => {
      if (error) {
        res.send(error);
      }
      // generate a signed son web token with the contents of user object and return it in the response
      const token = jwt.sign(user, config.secrets.jwt);
      return res.json({
        user: {
          'firstName': user.firstName,
          'lastName': user.lastName,
          'email': user.email
        },
        token: `JWT${token}`
      });
    });
  })(req, res);
}

module.exports = {
  verifyUser
};
