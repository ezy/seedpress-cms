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
    category: { type: DataTypes.STRING, defaultValue: 'news' },
    tags: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: [] },
    link: DataTypes.STRING,
    status: DataTypes.STRING,
    churches: { type: DataTypes.ARRAY(DataTypes.INTEGER), defaultValue: [] }
  }, {});
  return Audio;
};
