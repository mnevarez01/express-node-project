module.exports = function(sequelize, Sequelize) {
  // beer table -> name, description, ABV (integer), IBU (integer), type (porter,stout,ipa), foreign key (name of brewery)
  var Beer = sequelize.define('Beer', {
    name: { type: Sequelize.String },
    description: { type: Sequelize.String },
    ABV: { type: Sequelize.Integer },
    IBU: { type: Sequelize.Integer },
    beerType: { type: Sequelize.String },
    foreignKey: { type: Sequelize.String },

  });

  return Beer;
};