module.exports = function(sequelize, Sequelize) {
  // brewery table -> name, address, phone,
  var Brewery = sequelize.define('Brewery', {
    name: { type: Sequelize.STRING },
    address: { type: Sequelize.STRING },
    phoneNumber: { type: Sequelize.VarCHAR(45) },
  });

  return Brewery;
};