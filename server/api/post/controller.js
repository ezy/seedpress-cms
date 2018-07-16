const Post = require('../../../models').Post;
const Tag = require('../../../models').Tag;
const changeCase = require('change-case');

// Create new post
function createPost(req, res) {
  const title = req.body.title ? req.body.title.trim() : '';
  let slug = `${changeCase.paramCase(title)}-${Date.now()}`;

  const image = req.body.image ? req.body.image.trim() : '';
  const text = req.body.text ? req.body.text.trim() : '';
  const category = req.body.category ? req.body.category.trim() : 'news';
  const date = req.body.date ? req.body.date : new Date();
  const expiry = req.body.expiry ? req.body.expiry.trim() : '';
  const frequency = req.body.frequency ? req.body.frequency.trim() : '';
  const postTags = req.body.postTags ? req.body.postTags : [];
  const status = req.body.status ? req.body.status.trim() : '';

  if (!title) {
    return res.status(422).send({
      error: 'A title is required.'
    });
  }

  let newPost = { title,slug,image,text,category,date,expiry,frequency,status };

  Post.create(newPost)
    .then((post) => {
      postTags.forEach((tag) => {
        Tag.findOrCreate({where: { name: tag.name }})
          .spread((tag2) => {
            post.addPostTag(tag2);
          });
      });
      newPost = post.dataValues;
      newPost.postTags = postTags;
      return res.json({'post': newPost});
    })
    .catch((err) => res.status(400).send({
      error: err.message
    }));
}

// Get all posts
function getAllPosts(req, res) {
  Post.findAll({ include: [{
        model: Tag,
        as: 'postTags',
        required: false,
        attributes: ['id','name'],
        through: { attributes: [] }
      }]
    })
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
  Post.findOne({where: { slug }, include: [{
        model: Tag,
        as: 'postTags',
        required: false,
        attributes: ['id','name'],
        through: { attributes: [] }
      }]
    })
    .then((post) => {
      if (!post) {
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

  Post.findOne({where: { slug }})
    .then((post) => {
      if (!post) {
        return res.status(404).send({
          error: 'No post found'
        });
      }

      // Change the slug if the title is different
      let newTitle = changeCase.paramCase(req.body.title);
      if (!post.dataValues.slug.includes(newTitle)) {
        req.body.slug = `${newTitle}-${Date.now()}`;
      }
      return post.updateAttributes(req.body);
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
