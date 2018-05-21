module.exports = function(sequelize, DataTypes) {
  const Notice = sequelize.define('Notice', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    title: DataTypes.STRING,
    category: DataTypes.STRING,
    date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    expires: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    image: DataTypes.STRING,
    text: DataTypes.TEXT,
    frequency: DataTypes.STRING,
    tags: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: [] },
    status: DataTypes.STRING,
    churches: { type: DataTypes.ARRAY(DataTypes.INTEGER), defaultValue: [] }
  });
  return Notice;
};
