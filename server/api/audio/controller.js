const Audio = require('../../../models').Audio;
const signToken = require('../../auth/auth').signToken;

// Register new audio
function saveAudio(req, res) {
  const title = req.body.title ? req.body.title.trim() : '';
  const image = req.body.image ? req.body.image.trim() : '';
  const text = req.body.text ? req.body.text.trim() : '';
  const speaker = req.body.speaker ? req.body.speaker.trim() : '';
  const date = req.body.date ? req.body.date : new Date();
  const category = req.body.category ? req.body.category.trim() : '';
  const link = req.body.link ? req.body.link.trim() : '';
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
  Audio.findAll({
      where: {
        title
      }
    })
    .then((audio) => {
      if (audio.length > 0) {
        return res
          .status(400)
          .send({
            error: 'The audio has already been created'
          });
      }

      const newAudio = {
        title,
        image,
        text,
        speaker,
        date,
        category,
        link,
        tags,
        updated,
        status,
        churches
      };

      Audio.create(newAudio)
        .then((data) => res.json({
          audio: {
            id: data.id,
            title: data.title,
            date: data.date,
            image: data.image,
            text: data.text,
            speaker: data.speaker,
            category: data.category,
            link: data.link,
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

// Get one audio
function getAudio(req, res) {
  Audio.findById(req.params.id)
    .then((audio) => {
      if (!audio || audio.title.length <= 0) {
        return res.status(400).send({
          error: 'No audio found'
        });
      }
      return res.json({
        id: audio.id,
        title: audio.title,
        image: audio.image,
        text: audio.text,
        speaker: audio.speaker,
        date: audio.date,
        category: audio.category,
        link: audio.link,
        tags: audio.tags,
        updated: audio.updated,
        status: audio.status,
        churches: audio.churches
      });
    })
    .catch((err) => res.status(400).send({
      error: err.message
    }));
}

module.exports = {
  saveAudio,
  getAudio
};
