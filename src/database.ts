import dotenv from 'dotenv';
import { Pool } from 'pg';

if (process.env.ENV !== 'test') {
  dotenv.config();
}

const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB_TEST,
  ENV,
} = process.env;

let client = new Pool();

if (ENV === 'test') {
  client = new Pool({
    host: POSTGRES_HOST || '127.0.0.1',
    database: POSTGRES_DB_TEST || 'storefronttest',
    user: POSTGRES_USER || 'postgres',
    password: POSTGRES_PASSWORD || '000',
  });
} else if (ENV === 'dev') {
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  });
}

export default client;
