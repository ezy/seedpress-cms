const faker = require('faker');
const bcrypt = require('bcrypt');

let usersList = [];

for (let i = 0; i < 6; i++) {
  const userObj = {
    id: faker.random.uuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: bcrypt.hashSync('passwrod', 10),
    createdAt: new Date(),
    updatedAt: new Date()
  };
  usersList.push(userObj);
}

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Users', usersList.concat([{
      id: faker.random.uuid(),
      firstName: 'Ezra',
      lastName: 'Keddell',
      email: 'ezrakeddell@gmail.com',
      password: bcrypt.hashSync('passwrod', 10),
      createdAt: new Date(),
      updatedAt: new Date()
    }]), {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
