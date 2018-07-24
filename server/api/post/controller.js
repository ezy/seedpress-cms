const Post = require('../../../models').Post;
const Term = require('../../../models').Term;
const changeCase = require('change-case');

// Create new post
function createPost(req, res) {
  const postTitle = req.body.postTitle ? req.body.postTitle.trim() : null;
  let postSlug = `${changeCase.paramCase(postTitle)}-${Date.now()}`;
  const postType = req.body.postType ? req.body.postType.trim() : 'post';
  const postDate = req.body.postDate ? req.body.postDate : new Date();
  const postContent = req.body.postContent ? req.body.postContent.trim() : null;
  const postAuthor = req.body.postAuthor ? req.body.postAuthor.trim() : null;
  const postImage = req.body.postImage ? req.body.postImage.trim() : null;
  const postMedia = req.body.postMedia ? req.body.postMedia.trim() : null;
  const postStatus = req.body.postStatus ? req.body.postStatus.trim() : 'draft';
  const postExpiry = req.body.postExpiry ? req.body.postExpiry.trim() : null;
  const postFrequency = req.body.postFrequency ? req.body.postFrequency.trim() : null;

  const postTerms = req.body.postTerms ? req.body.postTerms : [];


  if (!postTitle) {
    return res.status(422).send({
      error: 'A postTitle is required.'
    });
  }

  postTerms.forEach((term) => {
    let termType = term.termType;
    let termName = term.termName;
    if (!termName || !termType) {
      return res.status(422).send({
        error: 'All terms require a termType and termName.'
      });
    }
    term.termSlug = `${changeCase.paramCase(termType)}-${changeCase.paramCase(termName)}`;
  });

  let newPost = {
    postTitle,
    postSlug,
    postType,
    postDate,
    postContent,
    postAuthor,
    postImage,
    postMedia,
    postStatus,
    postExpiry,
    postFrequency,
    postTerms
  };

  Post.create(newPost, {
      include: [{
        model: Term,
        as: 'postTerms'
      }]
    })
    .then((post) => {
      return res.json({post: post});
    })
    .catch((err) => res.status(400).send({
      error: err.errors
    }));
}

// Get all posts
function getAllPosts(req, res) {
  Post.findAll({ include: [{
        model: Term,
        as: 'postTerms',
        required: false,
        attributes: ['id','termType','termName','termSlug'],
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
        model: Term,
        as: 'postTerms',
        required: false,
        attributes: ['id','termType','termName','termSlug'],
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

  Post.findOne({where: { postSlug }, include: [{
        model: Term,
        as: 'postTerms',
        required: false,
        attributes: ['id','termType','termName','termSlug'],
        through: { attributes: [] }
      }]
    })
    .then((post) => {
      if (!post) {
        return res.status(404).send({
          error: 'No post found'
        });
      }

      // Update the post slug based on the title if title is new
      const postTitle = req.body.postTitle ? req.body.postTitle.trim() : null;
      if (req.body.postTitle && !post.dataValues.postSlug.includes(`${changeCase.paramCase(postTitle)}`)) {
        let slug = postTitle ? `${changeCase.paramCase(postTitle)}-${Date.now()}` : null;
        req.body.postSlug = slug;
      }

      let termsPromises = [];

      if (req.body.postTerms) {
        post.setPostTerms();
        req.body.postTerms.forEach((term) => {
          let { termType, termName } = term;
          term.termSlug = `${changeCase.paramCase(termType)}-${changeCase.paramCase(termName)}`;
          let termReq = Term.findOrCreate({where: {termSlug: term.termSlug}, defaults: { termType, termName }})
            .spread((term2) => {
              post.addPostTerm(term2);
            });
          termsPromises.push(termReq);
        });
      }

      post.updateAttributes(req.body);

      Promise.all([
        termsPromises
      ])
      .then(() => {
        return post.save();
      })
      .then((post2) => {
        return res.json({ post: post2 });
      })
      .catch((err) => res.status(400).send({
        error: err.message
      }));
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
