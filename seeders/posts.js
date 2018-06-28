const faker = require('faker');

let postsList = [];

for (let i = 0; i < 6; i++) {
  const userObj = {
    id: faker.random.uuid(),
    title: faker.lorem.sentence(5),
    category: 'news',
    date: new Date(),
    expiry: faker.date.future(),
    status: 'published',
    text: faker.lorem.slug(10),
    createdAt: new Date(),
    updatedAt: new Date()
  };
  postsList.push(userObj);
}

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Posts', postsList, {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Posts', null, {});
  }
};
