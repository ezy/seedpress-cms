const express = require('express');

const app = express();
const api = require('./api/api');
const auth = require('./auth/routes');

// Middlewares setup
require('./auth/passport');
require('./config/middlewares')(app);

// Routes
app.use('/api', api);
app.use('/auth', auth);

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error : err });
});

module.exports = app;
