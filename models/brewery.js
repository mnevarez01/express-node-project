module.exports = function (sequelize, Sequelize) {
  // brewery table -> name, address, phone,
  var Brewery = sequelize.define('Brewery', {
    name: { type: Sequelize.STRING },
    address: { type: Sequelize.STRING },
    phoneNumber: { type: Sequelize.STRING },
  });
  Brewery.associate = function (models) {
    Brewery.hasMany(models.Beer, {
      onDelete: 'cascade'
    });
    Brewery.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Brewery;
};