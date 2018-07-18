const date = new Date();

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    title: { type:DataTypes.STRING, allowNull: false },
    slug: { type:DataTypes.STRING, allowNull: false },
    image: DataTypes.STRING,
    category: { type:DataTypes.STRING, defaultValue: 'news', allowNull: false },
    date: { type: DataTypes.DATE, defaultValue: date, allowNull: false },
    expiry: DataTypes.DATE,
    frequency: DataTypes.STRING,
    status: DataTypes.STRING,
    content: DataTypes.TEXT
  }, {});
  Post.associate = (models) => {
    Post.belongsToMany(models.Tag, {
      through: 'PostTags',
      as: 'postTags',
      foreignKey: 'postId'
    });
  };
  return Post;
};
