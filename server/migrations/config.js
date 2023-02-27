require('dotenv').config();

module.exports = {
  defaultEnv: 'development',
  development: {
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
  },
};
