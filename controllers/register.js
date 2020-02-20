const jwt = require('jsonwebtoken')
const models = require('../models')
const User = models.user
const Pet = models.pet

exports.register = async (req, res) => {
    try {
        const { breeder, email, password, phone, address, pet } = req.body;
        const { name, gender } = pet;
        const species = pet.species.id;
        const age = pet.age.id;

        const check = await User.findOne({ where: { email } });
        if (check) {
            res
                .status(401)
                .send({ status: false, message: "The email is ready to login" });
        } else {
            const regUser = await User.create({
                email,
                password,
                breeder,
                phone,
                address
            });

            const user = regUser.dataValues.id;
            const regPet = await Pet.create({
                name,
                gender,
                species_id : species,
                age_id : age,
                user_id : user
            });

            if (regUser && regPet) {
                const token = jwt.sign({ user_id: user.id }, process.env.SECRET_KEY);
                res
                    .status(200)
                    .send({ email, token, status: true, message: "Register Success" });
            } else {
                res.status(401).send({ status: false, message: "Invalid Register" });
            }
        }
    } catch (err) {
        console.log(err);
    }
};