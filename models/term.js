/**
 * Terms are used for categorising posts. They can be a category, or tag
 */

module.exports = (sequelize, DataTypes) => {
  const Term = sequelize.define('Term', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
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
