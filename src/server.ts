import app from './app';
const config = require('./config/config').appConfig;

app.listen(config.port, () => {
  console.log('server listen on port:', config.port);
});
