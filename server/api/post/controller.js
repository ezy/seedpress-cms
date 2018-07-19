const Post = require('../../../models').Post;
const Tag = require('../../../models').Tag;
const Term = require('../../../models').Term;
const changeCase = require('change-case');

// Create new post
function createPost(req, res) {
  const postTitle = req.body.title ? req.body.title.trim() : '';
  let postSlug = `${changeCase.paramCase(postTitle)}-${Date.now()}`;
  const postDate = req.body.date ? req.body.date : new Date();
  const postContent = req.body.content ? req.body.content.trim() : '';
  const postAuthor = req.body.author ? req.body.author.trim() : '';
  const postImage = req.body.image ? req.body.image.trim() : '';
  const postMedia = req.body.media ? req.body.media.trim() : '';
  const postStatus = req.body.status ? req.body.status.trim() : '';
  const postExpiry = req.body.expiry ? req.body.expiry.trim() : '';
  const postFrequency = req.body.frequency ? req.body.frequency.trim() : '';

  const postTags = req.body.postCategories ? req.body.postCategories : [];
  const postTerms = req.body.postTags ? req.body.postTags : [];


  if (!postTitle) {
    return res.status(422).send({
      error: 'A postTitle is required.'
    });
  }

  let newPost = {
    postTitle,
    postSlug,
    postDate,
    postContent,
    postAuthor,
    postImage,
    postMedia,
    postStatus,
    postExpiry,
    postFrequency
  };

  Post.create(newPost)
    .then((post) => {
      newPost = post.dataValues;
      newPost.postTags = postTags;
      newPost.postTerms = postTerms;
      postTags.forEach((tag) => {
        Tag.findOrCreate({where: { name: tag.name }})
          .spread((tag2) => {
            post.addPostTag(tag2);
          });
      });
      postTerms.forEach((term) => {
        Tag.findOrCreate({where: { name: term.name }})
          .spread((term2) => {
            post.addTermTag(term2);
          });
      });
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
      },{
        model: Term,
        as: 'postTerms',
        required: false,
        attributes: ['id','name','slug'],
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
  const postSlug = req.params.postSlug;
  Post.findOne({where: { postSlug }, include: [{
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

// UppostDate existing post
function updatePost(req, res) {

  const postSlug = req.params.postSlug;

  Post.findOne({where: { postSlug }})
    .then((post) => {
      if (!post) {
        return res.status(404).send({
          error: 'No post found'
        });
      }

      // Change the postSlug if the postTitle is different
      let newTitle = changeCase.paramCase(req.body.postTitle);
      if (!post.dataValues.postSlug.includes(newTitle)) {
        req.body.postSlug = `${newTitle}-${Date.now()}`;
      }
      return post.uppostDateAttributes(req.body);
    })
    .then((uppostDatedPost) => {
      res.json(uppostDatedPost);
    })
    .catch((err) => res.status(400).send({
      error: err.message
    }));
}

// Delete one post
function deletePost(req, res) {
  const postSlug = req.params.postSlug;
  Post.findOne({where: { postSlug }})
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
