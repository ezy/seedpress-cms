const router = require('express').Router();
const controller = require('./controller');

router.route('/')
  .get(controller.getAllPosts);

router.route('/create')
  .post(controller.savePost);

router.route('/:id')
  .get(controller.getPost);

module.exports = router;
