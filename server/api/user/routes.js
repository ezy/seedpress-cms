const Router = require('express').Router();
const controller = require('./controller');

Router.route('/')
  .post(controller.saveUser);

Router.route(':id')
  .get(controller.getUser);

module.exports = Router;
