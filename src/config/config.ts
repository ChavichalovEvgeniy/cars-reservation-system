import * as dotenv from 'dotenv';

dotenv.config();

export = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST_DOCKER,
    dialect: 'postgres'
  },
  local: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST_DOCKER,
    dialect: 'postgres'
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST_DOCKER,
    dialect: 'postgres'
  },
  appConfig: {
    port: parseInt(process.env.PORT) || 8000,
    enviroment: process.env.ENVIROMENT
  }
};
