module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Audios', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.DATE
      },
      image: {
        type: Sequelize.STRING
      },
      text: {
        type: Sequelize.TEXT
      },
      speaker: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.STRING
      },
      link: {
        type: Sequelize.STRING
      },
      tags: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      status: {
        type: Sequelize.STRING
      },
      churches: {
        type: Sequelize.ARRAY(Sequelize.INTEGER)
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
  down: function(queryInterface/*, Sequelize*/) {
    return queryInterface.dropTable('Audios');
  }
};
