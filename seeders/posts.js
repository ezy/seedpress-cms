const faker = require('faker');
const changeCase = require('change-case');

let postsList = [];

for (let i = 0; i < 6; i++) {
  let title = faker.lorem.sentence(5);
  const postObj = {
    id: faker.random.uuid(),
    title: title,
    slug: `${changeCase.paramCase(title)}-${Date.now()}`,
    image: faker.image.imageUrl(),
    category: faker.random.arrayElement(['news','event','need']),
    date: new Date(),
    expiry: faker.date.future(),
    status: faker.random.arrayElement(['published','draft']),
    text: faker.lorem.text(),
    createdAt: new Date(),
    updatedAt: new Date()
  };
  postsList.push(postObj);
}

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Posts', postsList, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Posts', null, {});
  }
};
