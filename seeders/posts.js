const faker = require('faker');
const changeCase = require('change-case');

let postsList = [];

for (let i = 0; i < 2; i++) {
  let title = faker.lorem.sentence(5);
  const postObj = {
    id: faker.random.number(100000),
    postTitle: title,
    postSlug: `${changeCase.paramCase(title)}-${Date.now()}`,
    postType: faker.random.arrayElement(['post','page']),
    postDate: new Date(),
    postContent: faker.lorem.sentences(3,3),
    postAuthor: faker.name.findName(),
    postImage: faker.image.imageUrl(),
    postMedia: faker.image.imageUrl(),
    postStatus: faker.random.arrayElement(['published','draft']),
    postExpiry: faker.date.future(),
    postFrequency: faker.random.arrayElement([null,'day','week','fortnight','month']),
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
