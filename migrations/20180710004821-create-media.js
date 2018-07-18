module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Media', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      image: {
        type: Sequelize.STRING
      },
      author: {
        type: Sequelize.STRING
      },
      slug: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      link: {
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
    return queryInterface.dropTable('Media');
  }
};
