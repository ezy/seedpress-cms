const router = require('express').Router();
const controller = require('./controller');

router.route('/register')
  .post(controller.registerUser);

router.route('/login')
  .post(controller.verifyUser);

module.exports = router;
