"use strict";

module.exports = (sequelize, DataTypes) => {
  const games = sequelize.define("games", {
    category: DataTypes.STRING,
    name: DataTypes.STRING,
    checksum: DataTypes.STRING,
  });

  return games;
};
