module.exports = {
  api: {
    bodyParser: {
      sizeLimit: "1mb",
    },
  },
  env: {
    customKey: "my-value",
    api: process.env.PORT + "api/",
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    DB_NAME: process.env.DB_NAME,
    JWT_KEY: process.env.JWT_KEY,
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    IGDB_URL: process.env.IGDB_URL,
    OFFSET_LIST: process.env.OFFSET_LIST,
    LIMIT_LIST: process.env.LIMIT_LIST,
  },
  serverRuntimeConfig: {
    //   Will only be available on the server side
    //   mySecret: 'secret',
    //   secondSecret: process.env.SECOND_SECRET, // Pass through env variables

    apiUrl: "api",
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    staticFolder: "/public",
  },
  experimental: {
    appDir: true,
  },
};
