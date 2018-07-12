const router = require('express').Router();
const controller = require('./controller');
const passport = require('passport');

router.route('/')
  .post(passport.authenticate('jwt', { session: false }), controller.createPost);

router.route('/')
  .get(controller.getAllPosts);

router.route('/:slug')
  .get(controller.getPost);

router.route('/:slug')
  .patch(passport.authenticate('jwt', { session: false }), controller.updatePost);

router.route('/:slug')
  .delete(passport.authenticate('jwt', { session: false }), controller.deletePost);

module.exports = router;
