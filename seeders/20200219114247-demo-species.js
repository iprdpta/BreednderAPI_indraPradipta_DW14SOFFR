"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "species",
      [
        {
          name: "Dog",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Cat",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Bat",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Rat",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Hamster",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Bird",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("species", null, {});
  }
};
