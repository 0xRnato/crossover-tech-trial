const env = process.env.NODE_ENV || 'dev';
const config = require('./config.json');

process.env.NODE_ENV = env;

if (env === 'dev' || env === 'test' || env === 'prod') {
  const envConfig = config[env];
  Object.keys(envConfig).forEach((key) => {
    process.env[key] = envConfig[key];
  });
} else throw new Error('Invalid NODE_ENV');
