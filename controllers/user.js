const models = require("../models");
const User = models.user;
const Pet = models.pet;
const jwt = require("jsonwebtoken");

exports.detailUser = async (req, res) => {
  try {
    const { id } = req.params;
    const detail = await User.findOne({ where: { id } });

    const name = detail.breeder;
    res.status(200).send({ message: `Account Detail ${name}`, Detail: detail });
    console.log(err);
  } catch (err) {
    console.log(err);
  }
};

exports.updateUser = async (req, res) => {
  const id_data = req.params.id;
  const { email, password, breeder, phone, address } = req.body;

  const token = req.header("Authorization").replace("Bearer ", "");
  const user = jwt.verify(token, process.env.SECRET_KEY);
  const check = await User.findOne({ where: { id: user.user_id } });

  try {
    if (user.user_id != id_data) {
      res.send({ message: "You Can't Update an Account that not your own" });
    } else {
      const user = await User.update(
        {
          email,
          password,
          breeder,
          phone,
          address
        },
        { where: { id: id_data } }
      );

      const data = await User.findOne({
        attributes: {
          exclude: ["password"]
        },
        where: { id: id_data }
      });
      res.status(200).send({
        status: true,
        message: "Your Acoount Has Been Updated",
        data: data
      });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const token = req.header("Authorization").replace("Bearer ", "");
    const user = jwt.verify(token, process.env.SECRET_KEY);
    const check = await User.findOne({ where: { id: user.user_id } });

    const iduser = check.breeder;
    if (user.user_id != id) {
      res.send({ message: "You Can't Delete an Account that not your own" });
    } else {
      const deleteuser = await User.destroy({ where: { id: user.user_id } });
      const pet = await Pet.findOne({ where: { user_id: user.user_id } });
      const deletepet = await Pet.destroy({ where: { user_id: id } });
      res.status(200).send({
        message: `Your Account ${iduser} Has Been Deleted`,
        check,
        pet
      });
    }
  } catch (err) {
    console.log(err);
  }
};
