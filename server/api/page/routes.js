const router = require('express').Router();
const controller = require('./controller');

router.route('/')
  .page(controller.savePage);

router.route('/:id')
  .get(controller.getPage);

module.exports = router;
