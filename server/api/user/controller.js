// Get one user
function getUser(req, res) {
  res.send({user: res.req.user});
}

module.exports = {
  getUser
};
