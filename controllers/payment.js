const models = require("../models");
const jwt = require("jsonwebtoken");
const Payment = models.payment;
const User = models.user;

exports.addPayment = async (req, res) => {
  const { no_rek, proof_of_transfer } = req.body;

  const token = req.header("Authorization").replace("Bearer ", "");
  const user = jwt.verify(token, process.env.SECRET_KEY);
  const level = await User.findOne({ where: { id: user.user_id } });

  const check = await Payment.findOne({where : { users_id : user.user_id}});

  try {
    if (user && level.level > 0) {
      res.send({message: "You're an Admin, Can't Process the Payment"})
    } else {
      if(!check){
        const payment = await Payment.create({
          no_rek,
          proof_of_transfer,
          users_id: user.user_id,
          status : "Free"
        });
        res.status(200).send({
          status: true,
          message: "Success to Created Payment",
          data: payment
        });

      } else{
        res.send({ message: "You already add a payment, please wait until your payment has verified"})
      }
    }
  } catch (err) {
    console.log(err);
  }
};

exports.updatePayment = async (req, res) => {
  const id = req.params.id;
  const { no_rek, proof_of_transfer, status } = req.body;

  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const user = jwt.verify(token, process.env.SECRET_KEY);
    const level = await User.findOne({ where: { id: user.user_id } });

    if (user && level.level > 0) {
      const payment = await Payment.update(
        { no_rek, proof_of_transfer, status },
        { where: { id: id } }
      );
      const payment_detail = await Payment.findOne({
        include: [
          {
            model: User,
            as: "user",
            attributes: [
              "id",
              "breeder",
              "address",
              "phone",
              "createdAt",
              "UpdatedAt"
            ]
          }
        ],
        attributes: { exclude: ["user"] },
        where: { id: id }
      });
      res.status(200).send({
        status: true,
        message: "Success to Updated Payment",
        data: payment_detail
      });
    } else {
      res.status(200).send({
        status: false,
        message: "Only Admin to Update payment"
      });
    }
  } catch (err) {
    console.log(err);
  }
};
