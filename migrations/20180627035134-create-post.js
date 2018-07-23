
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true
      },
      postTitle: {
        type: Sequelize.STRING
      },
      postSlug: {
        type: Sequelize.STRING,
        unique: true
      },
      postType: {
        type: Sequelize.STRING
      },
      postDate: {
        type: Sequelize.DATE
      },
      postContent: {
        type: Sequelize.TEXT
      },
      postAuthor: {
        type: Sequelize.STRING
      },
      postImage: {
        type: Sequelize.STRING
      },
      postMedia: {
        type: Sequelize.STRING
      },
      postStatus: {
        type: Sequelize.STRING
      },
      postExpiry: {
        type: Sequelize.DATE
      },
      postFrequency: {
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
    return queryInterface.dropTable('Posts');
  }
};
