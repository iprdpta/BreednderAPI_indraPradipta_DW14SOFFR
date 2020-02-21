const models = require("../models");
const Match = models.match;
const Pet = models.pet;
const User = models.user;
const Species = models.species;

exports.checkMatch = async (req, res) => {
//   const { pet_id, pet_id_liked } = req.query;
  const { pet_id, pet_id_liked } = req.params;
  try {
    const data = await Match.findOne({ where: { pet_id, pet_id_liked } });
    if (data) {
      const pet = await Pet.findOne({
        include: [
          {
            model: User,
            as: "user",
            attributes: ["id", "breeder", "address", "phone"]
          },
          {
            model: Species,
            as: "species",
            attributes: ["id", "name"]
          }
        ],
        attributes: { exclude: ["user_id", "species_id", "createdAt", "updatedAt"] },
        where: { id: pet_id }
      });

      const pet_liked = await Pet.findOne({
        include: [
          {
            model: User,
            as: "user",
            attributes: ["id", "breeder", "address", "phone"]
          },
          {
            model: Species,
            as: "species",
            attributes: ["id", "name"]
          }
        ],
        attributes: { exclude: ["user_id", "species_id", "createdAt", "updatedAt"] },
        where: { id: pet_id_liked }
      });

      res.status(200).send({
        status: true,
        message: "Pet Matched",
        data: {
          id: data.id,
          status: data.status,
          pet,
          pet_liked,
          createAt: data.createdAt,
          updateAt: data.updatedAt
        }
      });
    } else {
      res.status(204).send({
        
        message: "Matched not found"
      });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.createMatch = async (req, res) => {
  try {
    const data = await Match.create(req.body);

    if (data) {
      const pet = await Pet.findOne({
        include: [
          {
            model: User,
            as: "user",
            attributes: ["id", "breeder", "address", "phone"]
          },
          {
            model: Species,
            as: "species",
            attributes: ["id", "name"]
          }
        ],
        attributes: { exclude: ["user_id", "species_id", "createdAt", "updatedAt"] },
        where: { id: data.pet_id }
      });

      const pet_liked = await Pet.findOne({
        include: [
          {
            model: User,
            as: "user",
            attributes: ["id", "breeder", "address", "phone"]
          },
          {
            model: Species,
            as: "species",
            attributes: ["id", "name"]
          }
        ],
        attributes: { exclude: ["user_id", "species_id", "createdAt", "updatedAt"] },
        where: { id: data.pet_id_liked }
      });

      res.status(200).send({
        status: true,
        message: "Pet Matched",
        data: {
          id: data.id,
          status: data.status,
          pet,
          pet_liked,
          createAt: data.createdAt,
          updateAt: data.updatedAt
        }
      });
    } else {
      res.status(204).send({
        status: false,
        message: "Pet Already Matched"
      });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.updateMatch = async (req, res) => {
  try {
    const { id } = req.params;
    const { pet_id, pet_id_liked, status } = req.body;
    const match = await Match.update(
      { pet_id, pet_id_liked, status },
      { where: { id } }
    );

    const find = await Match.findOne({
      attributes: { exclude: ["createdAt", "UpdatedAt"] },
      where: { id }
    });
    const pet = await Pet.findOne({
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "breeder", "address", "phone"]
        },
        {
          model: Species,
          as: "species",
          attributes: ["id", "name"]
        }
      ],
      attributes: { exclude: ["user_id", "species_id", "createdAt", "updatedAt"] },
      where: { id: find.pet_id }
    });

    const pet_liked = await Pet.findOne({
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "breeder", "address", "phone"]
        },
        {
          model: Species,
          as: "species",
          attributes: ["id", "name"]
        }
      ],
      attributes: { exclude: ["user_id", "species_id", "createdAt", "updatedAt"] },
      where: { id: find.pet_id_liked }
    });

    res.status(200).send({
      status: true,
      message: "Pet Matched Updated",
      data: {
        id: find.id,
        status: find.status,
        pet,
        pet_liked,
        createAt: find.createdAt,
        updateAt: find.updatedAt
      }
    });
  } catch (err) {
    console.log(err);
  }
};

exports.detailMatch = async (req, res) => {
  // const { pet_id, status } = req.query;
  try {
    const data = await Match.findAll({
      include: [
        {
          model: Pet,
          as: "pet",
          include: [
            {
              model: Species,
              as: "species",
              attributes: ["id", "name"]
            },
            {
              model: User,
              as: "user",
              attributes: ["id", "breeder", "address", "phone"]
            }
            
          ],
          attributes: [
            "id",
            "name",
            "gender",
            "about_pet",
            "photo"
          ]
        },
        {
          model: Pet,
          as: "pet_liked",
          include: [
            {
              model: Species,
              as: "species",
              attributes: ["id", "name"]
            },
            {
              model: User,
              as: "user",
              attributes: ["id", "breeder", "address", "phone"]
            }            
          ],
          attributes: [
            "id",
            "name",
            "gender",
            "about_pet",
            "photo"
          ]
        }
      ],
      attributes: { exclude: ["createdAt", "UpdatedAt"] },
      // where: { pet_id, status }
    });

    res.status(200).send({
      status: true,
      message: "Pet Matched",
      data
    });
  } catch (err) {
    console.log(err);
  }
};