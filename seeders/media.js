const faker = require('faker');
const changeCase = require('change-case');

let mediaList = [];

for (let i = 0; i < 6; i++) {
  let title = faker.lorem.sentence(5);
  const mediumObj = {
    id: faker.random.uuid(),
    title: title,
    slug: `${changeCase.paramCase(title)}-${Date.now()}`,
    image: faker.image.imageUrl(),
    author: faker.name.findName(),
    category: faker.random.arrayElement(['news','event','need']),
    date: new Date(),
    status: faker.random.arrayElement(['published','draft']),
    text: faker.lorem.text(),
    createdAt: new Date(),
    updatedAt: new Date()
  };
  mediaList.push(mediumObj);
}

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Media', mediaList, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Media', null, {});
  }
};
