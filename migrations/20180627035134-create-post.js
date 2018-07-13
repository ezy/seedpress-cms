
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      tagId: {
          type: Sequelize.UUID,
          references: {
              model: 'Posts',
              key: 'id'
          },
          onDelete: 'CASCADE'
      },
      title: {
        type: Sequelize.STRING
      },
      slug: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.STRING
      },
      frequency: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.DATE
      },
      expiry: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.STRING
      },
      text: {
        type: Sequelize.TEXT
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
    return queryInterface.dropTable('Posts');
  }
};
