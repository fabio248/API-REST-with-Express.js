import pkg from 'pg';
import config from '../config/config.js';

const { Pool } = pkg;
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);

const URL = `postgres://${USER}:${PASSWORD}@${config.host}:${config.dbHost}/${config.dbName}`;
const pool = new Pool({ connectionString: URL });

export default pool;
