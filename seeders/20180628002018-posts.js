module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Posts', [{
      id: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000',
      title: 'A new post',
      category: 'news',
      date: new Date(),
      expiry: new Date(),
      status: 'published',
      text: '<p>Some text.</p>'
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Posts', null, {});
  }
};
