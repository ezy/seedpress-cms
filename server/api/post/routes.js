const router = require('express').Router();
const controller = require('./controller');
const passport = require('passport');

router.route('/')
  .post(passport.authenticate('jwt', { session: false }), controller.createPost);

router.route('/')
  .get(controller.getAllPosts);

router.route('/:postSlug')
  .get(controller.getPost);

router.route('/:postSlug')
  .patch(passport.authenticate('jwt', { session: false }), controller.updatePost);

router.route('/:postSlug')
  .delete(passport.authenticate('jwt', { session: false }), controller.deletePost);

module.exports = router;
