const Router = require('express').Router();
const controller = require('./controller');

Router.route('/')
  .get(controller.getAllPosts);

Router.route('/create')
  .post(controller.savePost);

Router.route('/:id')
  .get(controller.getPost);

module.exports = Router;
