const router = require('express').Router();
const controller = require('./controller');
const passport = require('passport');

router.route('/')
  .post(passport.authenticate('jwt', { session: false }), controller.savePage);

router.route('/')
  .get(controller.getAllPages);

router.route('/:id')
  .get(controller.getPage);

module.exports = router;
