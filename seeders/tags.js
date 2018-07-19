const faker = require('faker');

let tagList = [];

for (let i = 0; i < 6; i++) {
  const tagObj = {
    id: i,
    tagName: faker.hacker.noun(),
    createdAt: new Date(),
    updatedAt: new Date()
  };
  tagList.push(tagObj);
}

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Tags', tagList, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Tags', null, {});
  }
};
