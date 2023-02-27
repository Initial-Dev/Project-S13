import { Pool } from 'pg';
import config from '../migrations/config';

const pool = new Pool(config[config.defaultEnv]);

async function query(text, params) {
  const start = Date.now();
  const result = await pool.query(text, params);
  const duration = Date.now() - start;
  console.log('Executed query', { text, params, duration, rows: result.rowCount });
  return result;
}

export default {
  query,
};
