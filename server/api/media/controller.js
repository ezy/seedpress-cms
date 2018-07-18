const Media = require('../../../models').Media;
const Tag = require('../../../models').Tag;
const changeCase = require('change-case');

// Register new media
function saveMedium(req, res) {
  const title = req.body.title ? req.body.title.trim() : '';
  let slug = `${changeCase.paramCase(title)}-${Date.now()}`;

  const image = req.body.image ? req.body.image.trim() : '';
  const text = req.body.text ? req.body.text.trim() : '';
  const author = req.body.author ? req.body.author.trim() : '';
  const date = req.body.date ? req.body.date : new Date();
  const category = req.body.category ? req.body.category.trim() : '';
  const link = req.body.link ? req.body.link.trim() : '';
  const mediaTags = req.body.mediaTags ? req.body.mediaTags : [];
  const status = req.body.status ? req.body.status.trim() : '';

  if (!title) {
    return res
      .status(422)
      .send({
        error: 'A title is required.'
      });
  }

  let newMedia = {title,slug,image,text,author,date,category,link,status};

  Media.create(newMedia)
    .then((medium) => {
      newMedia = medium.dataValues;
      newMedia.mediaTags = mediaTags;
      mediaTags.forEach((tag) => {
        Tag.findOrCreate({where: { name: tag.name }})
          .spread((tag2) => {
            medium.addMediaTag(tag2);
          });
      });
      return res.json({'medium': newMedia});
    })
    .catch((err) => res.status(400).send({
      error: err.message
    }));
}

// Get all medias
function getAllMedia(req, res) {
  Media.findAll({ include: [{
        model: Tag,
        as: 'mediaTags',
        required: false,
        attributes: ['id','name'],
        through: { attributes: [] }
      }]
    })
    .then((media) => {
      return res.json({media});
    })
    .catch((err) => res.status(400).send({
      error: err.message
    }));
}

// Get one media
function getMedium(req, res) {
  const slug = req.params.slug;
  Media.findOne({where: { slug }, include: [{
        model: Tag,
        as: 'mediaTags',
        required: false,
        attributes: ['id','name'],
        through: { attributes: [] }
      }]
    })
    .then((medium) => {
      if (!medium || medium.title.length <= 0) {
        return res.status(400).send({
          error: 'No media found'
        });
      }
      return res.json({medium});
    })
    .catch((err) => res.status(400).send({
      error: err.message
    }));
}

// Update existing media
function updateMedium(req, res) {

  const slug = req.params.slug;

  Media.findOne({where: { slug }})
    .then((medium) => {
      if (!medium) {
        return res.status(404).send({
          error: 'No media found'
        });
      }

      // Change the slug if the title is different
      let newTitle = changeCase.paramCase(req.body.title);
      if (!medium.dataValues.slug.includes(newTitle)) {
        req.body.slug = `${newTitle}-${Date.now()}`;
      }
      return medium.updateAttributes(req.body);
    })
    .then((updatedMedia) => {
      res.json({medium: updatedMedia});
    })
    .catch((err) => res.status(400).send({
      error: err.message
    }));
}

// Delete one media
function deleteMedium(req, res) {
  const slug = req.params.slug;
  Media.findOne({where: { slug }})
  .then((media) => {
    media.destroy()
      .then(() => {
        res.status(200).send({
          success: 'Media successfully deleted.'
        });
      });
  })
  .catch((err) => res.status(400).send({
    error: err.message
  }));
}

module.exports = {
  saveMedium,
  getAllMedia,
  getMedium,
  updateMedium,
  deleteMedium
};
