const faker = require('faker');
const bcrypt = require('bcrypt');

let usersList = [];

for (let i = 0; i < 6; i++) {
  const userObj = {
    id: faker.random.uuid(),
    userName: faker.name.firstName(),
    userEmail: faker.internet.email(),
    userPass: bcrypt.hashSync('passwrod', 10),
    createdAt: new Date(),
    updatedAt: new Date()
  };
  usersList.push(userObj);
}

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Users', usersList.concat([{
      id: faker.random.uuid(),
      userName: 'John User',
      userEmail: 'user@email.com',
      userPass: bcrypt.hashSync('passwrod', 10),
      createdAt: new Date(),
      updatedAt: new Date()
    }]), {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
