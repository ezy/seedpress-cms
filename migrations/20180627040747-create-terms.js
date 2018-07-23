module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Terms', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true
      },
      termType: {
        type: Sequelize.STRING
      },
      termName: {
        type: Sequelize.STRING
      },
      termSlug: {
        type: Sequelize.STRING
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('Terms');
  }
};
