const router = require('express').Router();
const controller = require('./controller');
const passport = require('passport');

router.route('/')
  .post(passport.authenticate('jwt', { session: false }), controller.savePost);
  
router.route('/')
  .get(controller.getAllPosts);

router.route('/:id')
  .get(controller.getPost);

module.exports = router;
