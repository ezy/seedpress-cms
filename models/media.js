module.exports = (sequelize, DataTypes) => {
  const Media = sequelize.define('Media', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
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
    link: DataTypes.STRING,
    status: DataTypes.STRING
  }, {});
  Media.associate = function(models) {
    Media.hasMany(models.Tag);
  };
  return Media;
};
