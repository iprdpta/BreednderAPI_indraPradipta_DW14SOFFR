"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "pets",
      [
        {
          name: "Jon Snow",
          gender: "Male",
          about_pet:"aaaaaaaaaaaaaaaaaaaaaaaaaa",
          photo:"https://www.guidedogs.org/wp-content/uploads/2019/11/website-donate-mobile.jpg",
          species_id: 1,
          age_id:1,
          user_id:1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "Hams",
          gender: "Male",
          about_pet:"aaaaaaaaaaaaaasw",
          photo:"https://i.pinimg.com/originals/35/3d/2b/353d2bfcd7a698b3b32bc75ccfcd4cfc.jpg",
          species_id: 5,
          age_id:3,
          user_id:2,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("pets", null, {});
  }
};
