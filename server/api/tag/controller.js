const Tag = require('../../../models').Tag;

// Get all posts
function getAllTags(req, res) {
  Tag.findAll()
    .then((tags) => {
      return res.json({tags});
    })
    .catch((err) => res.status(400).send({
      error: err.message
    }));
}

module.exports = {
  getAllTags
};
