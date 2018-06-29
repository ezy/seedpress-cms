const router = require('express').Router();
const controller = require('./controller');

router.route('/login')
  .post(controller.verifyUser);

module.exports = router;
