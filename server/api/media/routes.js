const router = require('express').Router();
const controller = require('./controller');
const passport = require('passport');

router.route('/')
  .post(passport.authenticate('jwt', { session: false }), controller.saveMedia);

router.route('/')
  .get(controller.getAllMedia);

router.route('/:id')
  .get(controller.getMedia);


module.exports = router;
