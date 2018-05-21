'use strict';
module.exports = function(sequelize, DataTypes) {
  const Ministry = sequelize.define('Ministry', {
    title: DataTypes.STRING,
    image: DataTypes.STRING,
    body: DataTypes.STRING
  });
  return Ministry;
};
