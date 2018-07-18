const Page = require('../../../models').Page;
const changeCase = require('change-case');

// Register new page
function createPage(req, res) {
  const title = req.body.title ? req.body.title.trim() : '';
  let slug = `${changeCase.paramCase(title)}-${Date.now()}`;

  const image = req.body.image ? req.body.image.trim() : '';
  const text = req.body.text ? req.body.text.trim() : '';
  const slide = req.body.slide ? req.body.slide.trim() : '';
  const status = req.body.status ? req.body.status.trim() : '';

  if (!title) {
    return res
      .status(422)
      .send({
        error: 'A title is required.'
      });
  }

  // Check if title already exists
  Page.findOne({where: { slug }})
    .then((pageRes) => {
      if (pageRes) {
        return res.status(409).send({
          error: 'The page has already been created'
        });
      }

      const newPage = { title,slug,image,text,slide,status };

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

// Get all pages
function getAllPages(req, res) {
  Page.findAll()
    .then((pages) => {
      return res.json({ pages });
    })
    .catch((err) => res.status(400).send({
      error: err.message
    }));
}

// Get one page
function getPage(req, res) {
  const slug = req.params.slug;
  Page.findOne({where: { slug }})
    .then((page) => {
      if (!page) {
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

// Update existing page
function updatePage(req, res) {

  const slug = req.params.slug;

  Page.findOne({where: { slug }})
    .then((page) => {
      if (!page) {
        return res.status(404).send({
          error: 'No page found'
        });
      }

      // Change the slug if the title is different
      let newTitle = changeCase.paramCase(req.body.title);
      if (!page.dataValues.slug.includes(newTitle)) {
        req.body.slug = `${newTitle}-${Date.now()}`;
      }
      return page.updateAttributes(req.body);
    })
    .then((updatedPage) => {
      res.json(updatedPage);
    })
    .catch((err) => res.status(400).send({
      error: err.message
    }));
}

// Delete one page
function deletePage(req, res) {
  const slug = req.params.slug;
  Page.findOne({where: { slug }})
  .then((page) => {
    page.destroy()
      .then(() => {
        res.status(200).send({
          success: 'Page successfully deleted.'
        });
      });
  })
  .catch((err) => res.status(400).send({
    error: err.message
  }));
}

module.exports = {
  createPage,
  getAllPages,
  getPage,
  updatePage,
  deletePage
};
