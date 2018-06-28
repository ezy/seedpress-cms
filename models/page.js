module.exports = (sequelize, DataTypes) => {
  let Page = sequelize.define('Page', {
    image: DataTypes.STRING,
    slide: DataTypes.INTEGER,
    status: DataTypes.STRING,
    text: DataTypes.TEXT,
    title: DataTypes.STRING
  }, {});
  return Page;
};
