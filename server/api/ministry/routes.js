const Router = require('express').Router();
const controller = require('./controller');

Router.route('/')
  .post(controller.saveMinistry);

Router.route('/:id')
  .get(controller.getMinistry);

module.exports = Router;
