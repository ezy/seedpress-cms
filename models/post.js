const date = new Date();

module.exports = (sequelize, DataTypes) => {
  let Post = sequelize.define('Post', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    title: { type:DataTypes.STRING, allowNull: false },
    image: DataTypes.STRING,
    category: { type:DataTypes.STRING, defaultValue: 'news', allowNull: false },
    date: { type: DataTypes.DATE, defaultValue: date, allowNull: false },
    expiry: DataTypes.DATE,
    frequency: DataTypes.STRING,
    status: DataTypes.STRING,
    text: DataTypes.TEXT
  }, {});
  Post.associate = function(models) {
    Post.hasMany(models.Tag);
  };
  return Post;
};
