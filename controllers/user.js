const models = require("../models");
const User = models.user;

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
      message: "Success Update your pet",
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
      res.status(200).send({ message: `Your Account ${iduser} Has Been Deleted`});
      console.log(err);
    } catch (err) {
      console.log(err);
    }
  };
