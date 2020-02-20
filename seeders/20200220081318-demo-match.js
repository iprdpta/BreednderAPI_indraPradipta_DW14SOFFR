"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "matches",
      [
        {
          pet_id: 1,
          pet_id_liked: 3,
          status: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          pet_id: 3,
          pet_id_liked: 1,
          status: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          pet_id: 2,
          pet_id_liked: 4,
          status: 0,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          pet_id: 2,
          pet_id_liked: 4,
          status: 0,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("match", null, {});
  }
};
