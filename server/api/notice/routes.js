const Router = require('express').Router();
const controller = require('./controller');

Router.route('/')
  .post(controller.saveNotice);

Router.route('/:id')
  .get(controller.getNotice);

module.exports = Router;
