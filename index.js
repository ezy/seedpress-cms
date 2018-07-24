const app = require('./server/server');
const config = require('./server/config/config');

// Start listening
app.listen(config.port, () => {
  console.log('Server started http://localhost:%s', config.port);
});
