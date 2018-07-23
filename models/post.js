const date = new Date();

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    postTitle: {
      type: DataTypes.STRING,
      allowNull: false
    },
    postSlug: {
      type: DataTypes.STRING,
      allowNull: false
    },
    postType: {
      type: DataTypes.STRING,
      defaultValue: 'post',
      allowNull: false
    },
    postDate: {
      type: DataTypes.DATE,
      defaultValue: date,
      allowNull: false
    },
    postContent: DataTypes.TEXT,
    postAuthor: DataTypes.STRING,
    postImage: DataTypes.STRING,
    postMedia: DataTypes.STRING,
    postStatus: DataTypes.STRING,
    postExpiry: DataTypes.DATE,
    postFrequency: DataTypes.STRING
  }, {});
  Post.associate = (models) => {
    Post.belongsToMany(models.Term, {
      through: 'PostTerms',
      as: 'postTerms',
      foreignKey: 'postId'
    });
  };
  return Post;
};
