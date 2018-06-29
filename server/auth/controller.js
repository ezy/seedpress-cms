const jwt = require('jsonwebtoken');
const passport = require('passport');
const config = require('../config/config');

function verifyUser(req, res /*, next*/) {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: info.message
      });
    }
    req.login(user, { session: false }, (error) => {
      if (error) {
        res.send(error);
      }
      // generate a signed son web token with the contents of user object and return it in the response
      const token = jwt.sign(user, config.secrets.jwt, { expiresIn: 86400 * 30 });
      // Use to ensure token is valid and debug non-working bearer
      // jwt.verify(token, config.secrets.jwt, (errs, data) => {
      //   console.log(errs, data);
      // });
      res.json({
        user: {
          'firstName': user.firstName,
          'lastName': user.lastName,
          'email': user.email
        },
        message: info.message,
        token
      });
    });
  })(req, res);
}

module.exports = {
  verifyUser
};
