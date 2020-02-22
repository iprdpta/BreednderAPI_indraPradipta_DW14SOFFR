const models = require("../models");
const User = models.user;
const Pet = models.pet;

exports.detailUser = async (req, res) => {
  try {
    const { id } = req.params;
    const detail = await User.findOne({ where: { id } });

    const name = detail.breeder;
    res.status(200).send({ message: `Your Pet ${name}`, Detail: detail });
    console.log(err);
  } catch (err) {
    console.log(err);
  }
};

exports.updateUser = async (req, res) => {
  const id_data = req.params.id;
  const { email, password, breeder, phone, address } = req.body;

  try {
    //console.log(req.user);
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
    
    const data = await User.findOne({where: { id: id_data }});
    res.status(200).send({
      status: true,
      message: "Your Acoount Has Been Updated",
      data: data
    });
  } catch (err) {
    console.log(err);
  }
};

exports.deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
      const usx = await User.findOne({ where: { id } });
      const deleteuser = await User.destroy({ where: { id } });
      const iduser = usx.breeder;

      const pet = await Pet.findAll ({ where: {user_id : id}})
      const deletepet = await Pet.destroy({ where: {user_id : id}})
      res.status(200).send({ message: `Your Account ${iduser} Has Been Deleted`, pet});
      console.log(err);
    } catch (err) {
      console.log(err);
    }
  };
