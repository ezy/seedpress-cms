const faker = require('faker');
const changeCase = require('change-case');

let pagesList = [];

for (let i = 0; i < 6; i++) {
  let title = faker.lorem.sentence(5);
  const userObj = {
    id: faker.random.uuid(),
    title: title,
    slug: `${changeCase.paramCase(title)}-${Date.now()}`,
    image: faker.image.imageUrl(),
    status: faker.random.arrayElement(['published','draft']),
    slide: faker.random.arrayElement(['0','1']),
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
