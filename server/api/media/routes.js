const Router = require('express').Router();
const controller = require('./controller');

Router.route('/')
  .post(controller.saveMedia);

Router.route('/:id')
  .get(controller.getMedia);

module.exports = Router;
