'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    breeder: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    pet_id: DataTypes.INTEGER,
    level: DataTypes.INTEGER
  }, {});
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};