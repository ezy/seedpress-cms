const router = require('express').Router();
const controller = require('./controller');

router.route('/')
  .post(controller.saveMedia);

router.route('/:id')
  .get(controller.getMedia);

module.exports = router;
