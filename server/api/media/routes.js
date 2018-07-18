const router = require('express').Router();
const controller = require('./controller');
const passport = require('passport');

router.route('/')
  .post(passport.authenticate('jwt', { session: false }), controller.saveMedium);

router.route('/')
  .get(controller.getAllMedia);

router.route('/:slug')
  .get(controller.getMedium);

router.route('/:slug')
  .patch(passport.authenticate('jwt', { session: false }), controller.updateMedium);

router.route('/:slug')
  .delete(passport.authenticate('jwt', { session: false }), controller.deleteMedium);


module.exports = router;
