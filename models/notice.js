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
    text: DataTypes.STRING,
    frequency: DataTypes.STRING,
    tags: DataTypes.ARRAY,
    updated: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    status: DataTypes.STRING,
    churches: DataTypes.ARRAY
  });
  return Notice;
};
