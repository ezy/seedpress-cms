const Router = require('express').Router();
const controller = require('./controller');
const auth = require('../../auth/auth');

Router.route('/')
  .post(controller.saveUser);

Router.route('/:id')
  .get(controller.getUser);

module.exports = Router;
