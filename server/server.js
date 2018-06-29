const express = require('express');

const app = express();
const api = require('./api/api');
const auth = require('./auth/routes');
const passport = require('passport');

// Middlewares setup
require('./auth/passport');
require('./config/middlewares')(app);

// Routes
app.use('/api', api);
app.use('/auth', auth);

app.use((err, req, res, next) => {
  // if error thrown from jwt validation check
  if (err.name === 'UnauthorizedError') {
    return res.status(401).send({ error: 'Invalid token' });
  }
  res.json({
    status: res.status,
    message: err.message
  });
  next();
});

module.exports = app;
