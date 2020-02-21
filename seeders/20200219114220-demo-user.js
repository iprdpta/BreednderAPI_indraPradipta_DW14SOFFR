"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "users",
      [
        {
          email: "ip@gmail.com",
          password: "ip123",
          breeder: "IP",
          phone: "0869696969",
          address: "Jalan jalan",
          level: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          email: "spiderman@gmail.com",
          password: "kepobanget",
          breeder: "Spiderman",
          phone: "083896831233",
          address: "permata bintaro residence",
          level: 0,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          email: "batman@gmail.com",
          password: "bat",
          breeder: "Batman",
          phone: "0869696969",
          address: "Gotham",
          level: 0,
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
