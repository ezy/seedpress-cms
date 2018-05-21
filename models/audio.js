module.exports = (sequelize, DataTypes) => {
  const Audio = sequelize.define('Audio', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    title: DataTypes.STRING,
    date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    image: DataTypes.STRING,
    text: DataTypes.TEXT,
    speaker: DataTypes.STRING,
    category: DataTypes.STRING,
    tags: DataTypes.ARRAY(DataTypes.STRING),
    link: DataTypes.STRING,
    status: DataTypes.STRING,
    churches: DataTypes.ARRAY(DataTypes.INTEGER)
  }, {});
  return Audio;
};
