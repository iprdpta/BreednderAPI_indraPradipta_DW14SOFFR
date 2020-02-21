'use strict';
module.exports = (sequelize, DataTypes) => {
  const payment = sequelize.define('payment', {
    no_rek: DataTypes.STRING,
    proof_of_transfer: DataTypes.STRING,
    users_id: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {});
  payment.associate = function(models) {
    // associations can be defined here
    payment.belongsTo(models.user, {
      foreignKey: "users_id",
      as: "user"
    });
  };
  return payment;
};