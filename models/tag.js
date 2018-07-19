module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    tagName: {
      type: DataTypes.STRING,
      unique: true
    }
  }, {});
  Tag.associate = (models) => {
    Tag.belongsToMany(models.Post, {
      through: 'PostTags',
      as: 'postTags',
      foreignKey: 'tagId'
    });
  };
  return Tag;
};
