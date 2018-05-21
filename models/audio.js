module.exports = function(sequelize, DataTypes) {
  const Audio = sequelize.define('Audio', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    title: DataTypes.STRING,
    date: DataTypes.DATE,
    image: DataTypes.STRING,
    text: DataTypes.STRING,
    speaker: DataTypes.STRING,
    category: DataTypes.STRING,
    link: DataTypes.STRING,
    updated: DataTypes.DATE,
    status: DataTypes.STRING,
    churches: DataTypes.ARRAY
  });
  return Audio;
};
