"use strict";

module.exports = {
  development: {
    username: "kameground",
    password: "postgres",
    database: "kameground",
    host: "postgres",
    dialect: "postgres",
    dialectOptions: {
      ssl: false,
    },
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres",
    dialectOptions: {
      ssl: false,
    },
  },
};
