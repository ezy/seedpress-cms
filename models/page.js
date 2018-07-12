module.exports = (sequelize, DataTypes) => {
  let Page = sequelize.define('Page', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    image: DataTypes.STRING,
    slide: DataTypes.INTEGER,
    status: DataTypes.STRING,
    slug: DataTypes.STRING,
    text: DataTypes.TEXT,
    title: DataTypes.STRING
  }, {});
  return Page;
};
