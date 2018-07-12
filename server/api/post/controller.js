const Post = require('../../../models').Post;
const changeCase = require('change-case');

// Create new post
function createPost(req, res) {
  const title = req.body.title ? req.body.title.trim() : '';
  let slug = `${changeCase.paramCase(title)}-${Date.now()}`;

  const image = req.body.image ? req.body.image.trim() : '';
  const text = req.body.text ? req.body.text.trim() : '';
  const category = req.body.category ? req.body.category.trim() : 'news';
  const date = req.body.date ? req.body.date : new Date();
  const expires = req.body.expires ? req.body.expires.trim() : '';
  const frequency = req.body.frequency ? req.body.frequency.trim() : '';
  const tags = req.body.tags ? req.body.tags : [];
  const updated = req.body.updated ? req.body.updated : new Date();
  const status = req.body.status ? req.body.status.trim() : '';

  if (!title) {
    return res.status(422).send({
      error: 'A title is required.'
    });
  }

  // Check if title already exists
  Post.findOne({where: { slug }})
    .then((postRes) => {
      if (postRes.length > 0) {
        return res.status(409).send({
          error: 'The page has already been created'
        });
      }

      const newPost = { title,slug,image,text,category,date,expires,frequency,tags,updated,status };

      Post.create(newPost)
        .then((post) => {
          return res.json({post});
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
function getAllPosts(req, res) {
  Post.findAll()
    .then((posts) => {
      return res.json({posts});
    })
    .catch((err) => res.status(400).send({
      error: err.message
    }));
}

// Get one post
function getPost(req, res) {
  const slug = req.params.slug;
  Post.findOne({where: { slug }})
    .then((post) => {
      if (!post || post.title.length <= 0) {
        return res.status(400).send({
          error: 'No post found'
        });
      }
      return res.json({ post });
    })
    .catch((err) => res.status(400).send({
      error: err.message
    }));
}

// Update existing post
function updatePost(req, res) {

  const slug = req.params.slug;

  // Check if title already exists
  Post.findOne({where: { slug }})
    .then((postRes) => {
      if (!postRes) {
        return res.status(404).send({
          error: 'The post doesn\'t exist'
        });
      }

      // Change the slug if the title is different
      let newTitle = changeCase.paramCase(req.body.title);
      if (!postRes.dataValues.slug.includes(newTitle)) {
        req.body.slug = `${newTitle}-${Date.now()}`;
      }
      return postRes.updateAttributes(req.body);
    })
    .then((updatedPost) => {
      res.json(updatedPost);
    })
    .catch((err) => res.status(400).send({
      error: err.message
    }));
}

// Delete one post
function deletePost(req, res) {
  const slug = req.params.slug;
  Post.findOne({where: { slug }})
  .then((post) => {
    post.destroy()
      .then(() => {
        res.status(200).send({
          success: 'Post successfully deleted.'
        });
      });
  })
  .catch((err) => res.status(400).send({
    error: err.message
  }));
}

module.exports = {
  createPost,
  getAllPosts,
  getPost,
  updatePost,
  deletePost
};
