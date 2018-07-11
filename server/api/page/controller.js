const Page = require('../../../models').Page;

// Register new page
function savePage(req, res) {
  const title = req.body.title ? req.body.title.trim() : '';
  const image = req.body.image ? req.body.image.trim() : '';
  const text = req.body.text ? req.body.text.trim() : '';
  const slide = req.body.slide ? req.body.slide.trim() : '';
  const updated = req.body.updated ? req.body.updated : new Date();
  const status = req.body.status ? req.body.status.trim() : '';

  if (!title) {
    return res
      .status(422)
      .send({
        error: 'A title is required.'
      });
  }

  // Check if title already exists
  Page.findAll({where: {title}})
    .then((pageRes) => {
      if (pageRes.length > 0) {
        return res
          .status(400)
          .send({
            error: 'The page has already been created'
          });
      }

      const newPage = {title,image,text,slide,updated,status};

      Page.create(newPage)
        .then((page) => {
          return res.json({page});
        })
        .catch((err) => res.status(400).send({
          error: err.message
        }));
    })
    .catch((err) => res.status(400).send({
      error: err.message
    }));
}

// Get all posts
function getAllPages(req, res) {
  Page.findAll()
    .then((pages) => {
      return res.json({pages});
    })
    .catch((err) => res.status(400).send({
      error: err.message
    }));
}

// Get one page
function getPage(req, res) {
  Page.findById(req.params.id)
    .then((page) => {
      if (!page || page.title.length <= 0) {
        return res.status(400).send({
          error: 'No page found'
        });
      }
      return res.json({page});
    })
    .catch((err) => res.status(400).send({
      error: err.message
    }));
}

module.exports = {
  savePage,
  getAllPages,
  getPage
};
