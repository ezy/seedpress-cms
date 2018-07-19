module.exports = (sequelize, DataTypes) => {
  let User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    userName: DataTypes.STRING,
    userEmail: DataTypes.STRING,
    userPass: DataTypes.STRING
  }, {});
  return User;
};
