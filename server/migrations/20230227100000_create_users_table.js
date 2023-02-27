exports.up = async (pgm) => {
    await pgm.sql(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
  };
  
  exports.down = async (pgm) => {
    await pgm.sql(`
      DROP TABLE users;
    `);
  };
  