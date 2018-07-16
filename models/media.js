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
    author: DataTypes.STRING,
    category: { type: DataTypes.STRING, defaultValue: 'news' },
    link: DataTypes.STRING,
    status: DataTypes.STRING
  }, {});
  Media.associate = function(models) {
    Media.belongsToMany(models.Tag, {
      through: 'MediaTags',
      as: 'mediaTags',
      foreignKey: 'mediaId'
    });
  };
  return Media;
};
