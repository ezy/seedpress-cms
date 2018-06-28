module.exports = (sequelize, DataTypes) => {
  let Page = sequelize.define('Page', {
    image: DataTypes.STRING,
    slide: DataTypes.NUMBER,
    status: DataTypes.STRING,
    text: DataTypes.TEXT,
    title: DataTypes.STRING
  }, {});
  return Page;
};
