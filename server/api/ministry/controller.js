const Ministry = require('../../../models').Ministry;
const signToken = require('../../auth/auth').signToken;

// Register new ministry
function saveMinistry(req, res) {
  const title = req.body.title ? req.body.title.trim() : '';
  const image = req.body.image ? req.body.image.trim() : '';
  const text = req.body.text ? req.body.text.trim() : '';
  const status = req.body.status ? req.body.status.trim() : 'draft';
  const churches = req.body.churches ? req.body.churches : [];

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
        text,
        status,
        churches
      };

      Ministry.create(newMinistry)
        .then((data) => res.json({
          ministry: {
            id: data.id,
            title: data.title,
            image: data.image,
            text: data.text,
            status: data.status,
            churches: data.churches
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
        text: ministry.text,
        status: ministry.status,
        churches: ministry.churches
      });
    })
    .catch((err) => res.status(400).send({ error: err.message }));
}

module.exports = {
  saveMinistry,
  getMinistry
};
