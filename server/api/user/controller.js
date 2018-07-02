const User = require('../../../models').User;

// Get one user
function getUser(req, res) {
  User.findById(req.params.id)
    .then((user) => {
      if (!user || user.email.length <= 0) {
        return res.status(400).send({ error: 'No such user.' });
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
  getUser
};
