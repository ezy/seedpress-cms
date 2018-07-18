module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('MediaTags', {
      mediaId: {
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
    return queryInterface.dropTable('MediaTags');
  }
};
