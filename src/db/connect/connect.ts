import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD
});

try {
  client.connect();

  console.log('successfully connect to db');
} catch (err) {
  console.error(err);
}

export default client;
