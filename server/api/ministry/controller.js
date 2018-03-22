const Ministry = require('../../../models').Ministry;
const signToken = require('../../auth/auth').signToken;

// Register new ministry
function saveMinistry(req, res) {
  const title = req.body.title ? req.body.title.trim() : '';
  const image = req.body.image ? req.body.image.trim() : '';
  const body = req.body.body ? req.body.body.trim() : '';

  if (!title) {
    return res
      .status(422)
      .send({ error: 'A title is required.' });
  }

  // Check if title already exists
  Ministry.findAll({
    where: { title }
  })
    .then((ministry) => {
      if (ministry.length > 0) {
        return res
        .status(400)
        .send({ error: 'The ministry has already been created' });
      }

      const newMinistry = {
        title,
        image,
        body
      };

      Ministry.create(newMinistry)
        .then((data) => res.json({
          ministry: {
            id: data.id,
            title: data.title,
            image: data.image,
            body: data.body
          }
        }))
        .catch((err) => res.status(400).send({ error: err.message }));
    })
    .catch((err) => res.status(400).send({ error: err.message }));
}

// Get one ministry
function getMinistry(req, res) {
  Ministry.findById(req.params.id)
    .then((ministry) => {
      if (!ministry || ministry.title.length <= 0) {
        return res.status(400).send({ error: 'No ministry found' });
      }
      return res.json({
        id: ministry.id,
        title: ministry.title,
        image: ministry.image,
        body: ministry.body
      });
    })
    .catch((err) => res.status(400).send({ error: err.message }));
}

module.exports = {
  saveMinistry,
  getMinistry
};
