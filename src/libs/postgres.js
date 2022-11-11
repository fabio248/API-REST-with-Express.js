import pkg from 'pg';
import config from '../config';

const { Client } = pkg;
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);

const URL = `postgres://${USER}:${PASSWORD}@${config.host}:${config.dbHost}/${config.dbName}`;

export default async function getConnection() {
  const client = new Client({ connectionString: URL });

  await client.connect();
  return client;
}
