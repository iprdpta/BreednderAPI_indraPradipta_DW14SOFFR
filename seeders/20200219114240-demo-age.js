"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "ages",
      [
        {
          name: "Adult",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Teenager",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Child",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('ages', null, {});
  }
};
