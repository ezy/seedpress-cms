const bcrypt = require('bcrypt');

const User = require('../../../models').User;
const signToken = require('../../auth/auth').signToken;
const validatePassword = require('../../utils/helpers').validatePassword;
const validateEmail = require('../../utils/helpers').validateEmail;
const generatePassword = require('../../utils/helpers').generatePassword;

// Register new user
function saveUser(req, res) {
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

  // Check if email already exists
  User.findAll({
    where: { email }
  })
    .then((user) => {
      if (user.length > 0) {
        return res
        .status(400)
        .send({ error: 'The email is already registered.' });
      }

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      const newUser = {
        email,
        password: hash
      };

      User.create(newUser)
        .then((data) => res.json({
          token: signToken(data.id),
          user: {
            id: data.id,
            email: data.email
          }
        }))
        .catch((err) => res.status(400).send({ error: err.message }));
    })
    .catch((err) => res.status(400).send({ error: err.message }));
}

// Get one user
function getUser(req, res) {
  User.findById(req.params.id)
    .then((user) => {
      if (!user || user.email.length <= 0) {
        return res.status(400).send({ error: 'No user found' });
      }
      return res.json({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      });
    })
    .catch((err) => res.status(400).send({ error: err.message }));
}

module.exports = {
  saveUser,
  getUser
};
