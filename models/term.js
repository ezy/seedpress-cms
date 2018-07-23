/**
 * Terms are used for categorising posts. They belong to many posts and can
 * have many labels. Need to create a post with tags? Then you might create a post
 * with a 'tag' term:
 *
 * postTerms: [{
 *    termType: tag,
 *    termName: business
 *  },{
 *    termType: tag,
 *    termName: pleasure
 *  }]
 */

module.exports = (sequelize, DataTypes) => {
  const Term = sequelize.define('Term', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    termType: {
      type: DataTypes.STRING
    },
    termName: {
      type: DataTypes.STRING
    },
    termSlug: {
      type: DataTypes.STRING,
      unique: true
    }
  }, {});
  Term.associate = (models) => {
    Term.belongsToMany(models.Post, {
      through: 'PostTerms',
      as: 'postTerms',
      foreignKey: 'termId'
    });
  };
  return Term;
};
