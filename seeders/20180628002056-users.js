module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      id: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc002',
      firstName: 'Alice',
      lastName: 'Smith',
      email: 'alice@cc.cc',
      password: 'Pass123!'
    },
    {
      id: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc003',
      firstName: 'Bob',
      lastName: 'Smith',
      email: 'bob@cc.cc',
      password: 'Pass123!'
    },
    {
      id: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc004',
      firstName: 'Chris',
      lastName: 'Smith',
      email: 'chris@cc.cc',
      password: 'Pass123!'
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
