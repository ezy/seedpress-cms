const express = require('express');

const app = express();
const api = require('./api/api');
const auth = require('./auth/routes');

// Middlewares setup
require('./config/middlewares')(app);

// Routes
app.use('/api', api);
app.use('/auth', auth);

app.use((err, req, res) => {
  // if error thrown from jwt validation check
  if (err.name === 'UnauthorizedError') {
    return res.status(401).send({ error: 'Invalid token' });
  }
  return res.status(500).send({ error: 'Something went wrong.' });
});

module.exports = app;
