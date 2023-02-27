const pg = require('pg');
const { run } = require('node-pg-migrate');
const config = require('./config');

const pool = new pg.Pool(config[config.defaultEnv]);

async function migrate() {
  try {
    await run({
      databaseUrl: pool,
      dir: './migrations/sql',
      direction: 'up',
    });
    console.log('Migration successful');
  } catch (error) {
    console.error('Migration error', error);
  }
}

migrate();
