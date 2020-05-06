module.exports = function (sequelize, Sequelize) {
  // beer table -> name, description, ABV (integer), IBU (integer), type (porter,stout,ipa), foreign key (name of brewery)
  var Beer = sequelize.define('Beer', {
    name: { type: Sequelize.STRING },
    description: { type: Sequelize.STRING },
    ABV: { type: Sequelize.FLOAT },
    IBU: { type: Sequelize.INTEGER, allowNull: true },
    beerType: { type: Sequelize.STRING }
    // foreignKey: { type: Sequelize.STRING },

  });
  Beer.associate = function (models) {
    Beer.belongsTo(models.Brewery, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Beer;
};