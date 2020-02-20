"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "users",
      [
        {
          email: "spiderman@gmail.com",
          password: "kepobanget",
          breeder: "Spiderman",
          phone: "083896831233",
          address: "permata bintaro residence",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          email: "ip@gmail.com",
          password: "ip123",
          breeder: "IP",
          phone: "0869696969",
          address: "Jalan jalan",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  }
};
