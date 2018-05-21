const Router = require('express').Router();
const controller = require('./controller');

Router.route('/')
  .post(controller.saveAudio);

Router.route('/:id')
  .get(controller.getAudio);

module.exports = Router;
