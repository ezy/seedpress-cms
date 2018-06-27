const Router = require('express').Router();
const controller = require('./controller');

Router.route('/')
  .post(controller.savePost);

Router.route('/:id')
  .get(controller.getPost);

module.exports = Router;
