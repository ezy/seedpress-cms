module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PostTags', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID
      },
      postId: {
        type: Sequelize.UUID
      },
      tagId: {
        type: Sequelize.UUID
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
    return queryInterface.dropTable('PostTags');
  }
};
