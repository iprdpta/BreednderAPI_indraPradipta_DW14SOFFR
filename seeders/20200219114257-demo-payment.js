"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "payments",
      [
        {
          no_rek: 1021691010,
          proof_of_transfer: "https://buktitransfer.jpg",
          users_id: 1,
          status: "free",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          no_rek: 69696969,
          proof_of_transfer: "https://buktitransfer.jpg",
          users_id: 2,
          status: "free",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("payments", null, {});
  }
};
