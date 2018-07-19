module.exports = (sequelize, DataTypes) => {
  const Term = sequelize.define('Term', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    termName: {
      type: DataTypes.STRING,
      unique: true
    },
    termSlug: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Term.associate = (models) => {
    Term.belongsToMany(models.Post, {
      through: 'PostTerms',
      as: 'postCategories',
      foreignKey: 'termId'
    });
  };
  return Term;
};
