const faker = require('faker');

let postsList = [];

for (let i = 0; i < 6; i++) {
  const userObj = {
    id: faker.random.uuid(),
    title: faker.lorem.words(5),
    category: 'news',
    date: new Date(),
    expiry: faker.date.future(),
    status: 'published',
    text: faker.lorem.sentence(),
    createdAt: new Date(),
    updatedAt: new Date()
  };
  postsList.push(userObj);
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Posts', postsList, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Posts', null, {});
  }
};
