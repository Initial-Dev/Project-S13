"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("games", [
      {
        category: 1,
        name: "Test Game 1",
        checksum: "812a8103-e177-93fd-1937-549e4da3eaa3",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category: 1,
        name: "Test Game 2",
        checksum: "b16dd7e4-ad57-4cdb-818d-62d005141a62",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("games", null, {});
  },
};
