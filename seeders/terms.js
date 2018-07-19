const faker = require('faker');
const changeCase = require('change-case');

let termList = [];

for (let i = 0; i < 6; i++) {
  let name = faker.hacker.noun();
  const termObj = {
    id: i,
    termName: name,
    termSlug: changeCase.paramCase(name),
    createdAt: new Date(),
    updatedAt: new Date()
  };
  termList.push(termObj);
}

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Terms', termList, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Terms', null, {});
  }
};
