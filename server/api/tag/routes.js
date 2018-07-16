const router = require('express').Router();
const controller = require('./controller');

router.route('/')
  .get(controller.getAllTags);

module.exports = router;
