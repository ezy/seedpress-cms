module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });


  // Insert seed users
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {

    const bcrypt = require('bcrypt');
    const users = require('../seeders/users');

    sequelize
    .sync()
    .then(() => {
      User
      .findAndCountAll()
      .then((result) => {
        if (result.count === 0) {
          for (let i = 0; i < users.length; i++) {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(users[i].password, salt);

            User.create({
              firstName: users[i].firstName,
              lastName: users[i].lastName,
              email: users[i].email,
              password: hash
            });
          }
        }
      });
    })
    .catch((e) => {
      console.error('ERROR SYNCING WITH DB: ', e);
    });
  }
  return User;
};
