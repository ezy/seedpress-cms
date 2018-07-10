const faker = require('faker');

let postsList = [];

for (let i = 0; i < 6; i++) {
  const userObj = {
    id: faker.random.uuid(),
    title: faker.lorem.sentence(5),
    image: faker.image.imageUrl(),
    category: faker.random.arrayElement(['news','event','need']),
    date: new Date(),
    expiry: faker.date.future(),
    status: faker.random.arrayElement(['published','draft']),
    text: faker.lorem.text(),
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
