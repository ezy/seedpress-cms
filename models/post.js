module.exports = (sequelize, DataTypes) => {
  let Post = sequelize.define('Post', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    title: DataTypes.STRING,
    category: DataTypes.STRING,
    date: DataTypes.DATE,
    expiry: DataTypes.DATE,
    status: DataTypes.STRING,
    text: DataTypes.TEXT
  }, {});
  Post.associate = function(models) {
    Post.hasMany(models.Tag);
  };
  return Post;
};
