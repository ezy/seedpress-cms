const router = require('express').Router();
const controller = require('./controller');
const passport = require('passport');

router.route('/')
  .post(passport.authenticate('jwt', { session: false }), controller.createPage);

router.route('/')
  .get(controller.getAllPages);

router.route('/:slug')
  .get(controller.getPage);

router.route('/:slug')
  .patch(passport.authenticate('jwt', { session: false }), controller.updatePage);

router.route('/:slug')
  .delete(passport.authenticate('jwt', { session: false }), controller.deletePage);

module.exports = router;
