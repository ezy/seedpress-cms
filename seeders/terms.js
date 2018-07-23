const faker = require('faker');
const changeCase = require('change-case');

let termList = [];

for (let i = 0; i < 6; i++) {
  const name = faker.hacker.noun();
  const type = faker.hacker.noun();
  const termObj = {
    id: faker.random.number(100000),
    termType: type,
    termName: name,
    termSlug: `${changeCase.paramCase(type)}-${changeCase.paramCase(name)}`,
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
