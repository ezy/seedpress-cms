const Router = require('express').Router();
const controller = require('./controller');

Router.route('/login')
  .post(controller.verifyUser);

module.exports = Router;
