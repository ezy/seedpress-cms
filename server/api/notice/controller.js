const Notice = require('../../../models').Notice;
const signToken = require('../../auth/auth').signToken;

// Register new notice
function saveNotice(req, res) {
  const title = req.body.title ? req.body.title.trim() : '';
  const image = req.body.image ? req.body.image.trim() : '';
  const text = req.body.text ? req.body.text.trim() : '';
  const category = req.body.category ? req.body.category.trim() : '';
  const date = req.body.date ? req.body.date : new Date();
  const expires = req.body.expires ? req.body.expires.trim() : '';
  const frequency = req.body.frequency ? req.body.frequency.trim() : '';
  const tags = req.body.tags ? req.body.tags : [];
  const updated = req.body.updated ? req.body.updated : new Date();
  const status = req.body.status ? req.body.status.trim() : '';
  const churches = req.body.churches ? req.body.churches : [];

  if (!title) {
    return res
      .status(422)
      .send({
        error: 'A title is required.'
      });
  }

  // Check if title already exists
  Notice.findAll({
      where: {
        title
      }
    })
    .then((notice) => {
      if (notice.length > 0) {
        return res
          .status(400)
          .send({
            error: 'The notice has already been created'
          });
      }

      const newNotice = {
        title,
        image,
        text,
        category,
        date,
        expires,
        frequency,
        tags,
        updated,
        status,
        churches
      };

      Notice.create(newNotice)
        .then((data) => res.json({
          notice: {
            id: data.id,
            title: data.title,
            image: data.image,
            text: data.text,
            category: data.category,
            date: data.date,
            expires: data.expires,
            frequency: data.frequency,
            tags: data.tags,
            updated: data.updated,
            status: data.status,
            churches: data.churches
          }
        }))
        .catch((err) => res.status(400).send({
          error: err.message
        }));
    })
    .catch((err) => res.status(400).send({
      error: err.message
    }));
}

// Get one notice
function getNotice(req, res) {
  Notice.findById(req.params.id)
    .then((notice) => {
      if (!notice || notice.title.length <= 0) {
        return res.status(400).send({
          error: 'No notice found'
        });
      }
      return res.json({
        id: notice.id,
        title: notice.title,
        image: notice.image,
        text: notice.text,
        category: notice.category,
        date: notice.date,
        expires: notice.expires,
        frequency: notice.frequency,
        tags: notice.tags,
        updated: notice.updated,
        status: notice.status,
        churches: notice.churches
      });
    })
    .catch((err) => res.status(400).send({
      error: err.message
    }));
}

module.exports = {
  saveNotice,
  getNotice
};
