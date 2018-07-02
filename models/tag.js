module.exports = (sequelize, DataTypes) => {
  let Tag = sequelize.define('Tag', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    name: DataTypes.STRING
  }, {});
  Tag.associate = function(models) {
    Tag.belongsTo(models.Post);
  };
  return Tag;
};
