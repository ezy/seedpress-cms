module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Pages', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      image: {
        type: Sequelize.STRING
      },
      slide: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.STRING
      },
      text: {
        type: Sequelize.TEXT
      },
      title: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('Pages');
  }
};
