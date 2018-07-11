const Post = require('../../../models').Post;

// Register new post
function savePost(req, res) {
  const title = req.body.title ? req.body.title.trim() : '';
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
    return res
      .status(422)
      .send({error: 'A title is required.'});
  }

  // Check if title already exists
  Post.findAll({where: {title}})
    .then((postRes) => {
      if (postRes.length > 0) {
        return res
          .status(400)
          .send({
            error: 'The post has already been created'
          });
      }

      const newPost = { title,image,text,category,date,expires,frequency,tags,updated,status };

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
  Post.findById(req.params.id)
    .then((post) => {
      if (!post || post.title.length <= 0) {
        return res.status(400).send({
          error: 'No post found'
        });
      }
      return res.json({post});
    })
    .catch((err) => res.status(400).send({
      error: err.message
    }));
}

module.exports = {
  savePost,
  getAllPosts,
  getPost
};
