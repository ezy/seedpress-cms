module.exports = (sequelize, DataTypes) => {
  let Tag = sequelize.define('Tag', {
    name: DataTypes.STRING
  }, {});
  Tag.associate = function(models) {
    Tag.belongsTo(models.Post);
  };
  return Tag;
};
