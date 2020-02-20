'use strict';
module.exports = (sequelize, DataTypes) => {
  const pet = sequelize.define('pet', {
    name: DataTypes.STRING,
    gender: DataTypes.STRING,
    about_pet: DataTypes.STRING,
    photo: DataTypes.STRING,
    species_id: DataTypes.INTEGER,
    age_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {});
  pet.associate = function(models) {
    // associations can be defined here
    pet.belongsTo(models.age, {
      foreignKey: "age_id",
      sourceKey: "id"
    });
    pet.belongsTo(models.species, {
      foreignKey: "species_id",
      sourceKey: "id"
    });
    pet.belongsTo(models.user, {
      foreignKey: "user_id",
      sourceKey: "id"
    });
  };
  return pet;
};