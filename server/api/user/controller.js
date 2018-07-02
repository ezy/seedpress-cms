// Get one user
function getUser(req, res) {
  res.send(res.req.user);
}

module.exports = {
  getUser
};
