const faker = require('faker');

let pagesList = [];

for (let i = 0; i < 6; i++) {
  const userObj = {
    id: faker.random.uuid(),
    title: faker.lorem.sentence(5),
    image: faker.image.imageUrl(),
    status: faker.random.arrayElement(['published','draft']),
    slide: faker.random.arrayElement([0,1]),
    text: faker.lorem.text(),
    createdAt: new Date(),
    updatedAt: new Date()
  };
  pagesList.push(userObj);
}

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Pages', pagesList, {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Pages', null, {});
  }
};
