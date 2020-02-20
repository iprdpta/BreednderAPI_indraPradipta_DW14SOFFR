const models = require("../models");
const Species = models.species;

exports.addSpecies = async (req, res) => {
  try {
    const { name } = req.body;
    const check = await Species.findOne({ where: { name } });

    if (check) {
      res
        .status(401)
        .send({ message: "This Species Already Exists" });
    } else {
      const addSpecies = await Species.create({
        name
      });
      res.send({ addSpecies });
    }
  } catch(err) {
    console.log(err);
  }
};

exports.getSpecies = async (req, res) => {
    try {
      const { name } = req.body;
      const findSpecies = await Species.findOne({ where: { name } });
      res.send({ findSpecies });
    } catch {
        res
        .status(401)
        .send({ status: false, message: "Can't Find This Species" });
    }
  };

  exports.showAllSpecies= async (req, res) => {
    try {
      const species = await Species.findAll();
      res.send(species);
    } catch (err) {
      console.log(err);
    }
  };
  