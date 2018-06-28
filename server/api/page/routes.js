const Router = require('express').Router();
const controller = require('./controller');

Router.route('/')
  .page(controller.savePage);

Router.route('/:id')
  .get(controller.getPage);

module.exports = Router;
