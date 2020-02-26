const models = require("../models");
const jwt = require("jsonwebtoken");

const Pet = models.pet;
const User = models.user;
const Species = models.species;
const Age = models.age;
const Payment = models.payment;

exports.addPet = async (req, res) => {
  const { name, gender, age, about_pet, photo } = req.body;
  const species = req.body.spesies;
  const ages = await Age.findOne({ where: { name: age } });

  const token = req.header("Authorization").replace("Bearer ", "");
  const user = jwt.verify(token, process.env.SECRET_KEY);

  const payment = await Payment.findOne({ where: { users_id: user.user_id } });
  const ageid = ages.id;

  try {
    if (payment === null) {
      res.send({
        message:
          "You need to be Premium User to use this feature, Please add your Payment first"
      });
    } else {
      if (payment.status === "Premium") {
        const pet = await Pet.create({
          name,
          gender,
          species_id: species,
          age_id: ageid,
          user_id: user.user_id,
          about_pet,
          photo
        });
        const id = pet.id;
        const data = await Pet.findOne({
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
            },
            {
              model: Age,
              as: "age",
              attributes: ["id", "name"]
            }
          ],
          attributes: {
            exclude: [
              "user_id",
              "species_id",
              "age_id",
              "createdAt",
              "updatedAt"
            ]
          },
          where: { id }
        });
        res.status(200).send({
          status: true,
          message: "Success Add Your pet",
          data
        });
      } else {
        res.send({
          message:
            "Your Payment need to be Verified first, Please Wait until your payment has verified..."
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

exports.indexPet = async (req, res) => {
  try {
    const species = await Pet.findAll({
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
      attributes: { exclude: ["user_id", "species_id"] }
    });
    res.send(species);
  } catch (err) {
    console.log(err);
  }
};

exports.updatePet = async (req, res) => {
  const id_data = req.params.id;
  const { name, gender, age, about_pet, photo } = req.body;
  const species = req.body.spesies;

  const token = req.header("Authorization").replace("Bearer ", "");
  const user = jwt.verify(token, process.env.SECRET_KEY);

  const ages = await Age.findOne({ where: { name: age } });

  const ageid = ages.id;

  const check = await Pet.findOne({
    where: { id: id_data, user_id: user.user_id }
  });

  try {
    if (!check) {
      res.send({ message: "Yot're not the owner of this pet" });
    } else {
      const pet = await Pet.update(
        {
          name,
          gender,
          species,
          age_id: ageid,
          about_pet,
          photo
        },
        { where: { id: id_data } }
      );
      const id = req.params.id;
      const data = await Pet.findOne({
        include: [
          {
            model: User,
            as: "user",
            attributes: ["id", "breeder", "address", "phone"]
          },
          {
            model: Age,
            as: "age",
            attributes: ["id", "name"]
          },
          {
            model: Species,
            as: "species",
            attributes: ["id", "name"]
          }
        ],
        attributes: {
          exclude: ["user_id", "species_id", "age_id", "createdAt", "updatedAt"]
        },
        where: { id }
      });
      res.status(200).send({
        status: true,
        message: "Success Update your pet",
        data: data
      });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.deletePet = async (req, res) => {
  const id_data = req.params.id;
  const token = req.header("Authorization").replace("Bearer ", "");
  const user = jwt.verify(token, process.env.SECRET_KEY);

  const check = await Pet.findOne({
    where: { id: id_data, user_id: user.user_id }
  });
  try {
    if (!check) {
      res.send({ message: "Yot're not the owner of this pet" });
    } else {
      const { id } = req.params;
      const petx = await Pet.findOne({ where: { id } });
      const pet = await Pet.destroy({ where: { id } });
      const idpet = petx.name;
      res.status(200).send({ message: `Your Pet ${idpet} Has Been Deleted` });
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
};

exports.detailPet = async (req, res) => {
  try {
    const { id } = req.params;
    const detail = await Pet.findOne({
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
      attributes: {
        exclude: ["user_id", "species_id", "age_id", "createdAt", "updatedAt"]
      },
      where: { id }
    });

    const idpet = detail.name;
    res.status(200).send({ message: `Pet Name ${idpet}`, Detail: detail });
    console.log(err);
  } catch (err) {
    console.log(err);
  }
};
