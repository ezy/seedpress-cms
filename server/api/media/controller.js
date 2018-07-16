const Media = require('../../../models').Media;
const Tag = require('../../../models').Tag;

// Register new media
function saveMedia(req, res) {
  const title = req.body.title ? req.body.title.trim() : '';
  const image = req.body.image ? req.body.image.trim() : '';
  const text = req.body.text ? req.body.text.trim() : '';
  const author = req.body.author ? req.body.author.trim() : '';
  const date = req.body.date ? req.body.date : new Date();
  const category = req.body.category ? req.body.category.trim() : '';
  const link = req.body.link ? req.body.link.trim() : '';
  const mediaTags = req.body.mediaTags ? req.body.mediaTags : [];
  const updated = req.body.updated ? req.body.updated : new Date();
  const status = req.body.status ? req.body.status.trim() : '';

  if (!title) {
    return res
      .status(422)
      .send({
        error: 'A title is required.'
      });
  }

  let newMedia = {title,image,text,author,date,category,link,updated,status};

  Media.create(newMedia)
    .then((post) => {
      newMedia = post.dataValues;
      newMedia.mediaTags = mediaTags;
      mediaTags.forEach((tag) => {
        Tag.findOrCreate({where: { name: tag.name }})
          .spread((tag2) => {
            post.addMediaTag(tag2);
          });
      });
      return res.json({'post': newMedia});
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
      return res.json(media);
    })
    .catch((err) => res.status(400).send({
      error: err.message
    }));
}

// Get one media
function getMedia(req, res) {
  Media.findById(req.params.id, { include: [{
        model: Tag,
        as: 'mediaTags',
        required: false,
        attributes: ['id','name'],
        through: { attributes: [] }
      }]
    })
    .then((media) => {
      if (!media || media.title.length <= 0) {
        return res.status(400).send({
          error: 'No media found'
        });
      }
      return res.json({media});
    })
    .catch((err) => res.status(400).send({
      error: err.message
    }));
}

module.exports = {
  saveMedia,
  getAllMedia,
  getMedia
};
