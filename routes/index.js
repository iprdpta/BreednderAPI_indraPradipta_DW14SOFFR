const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");

const { login } = require("../controllers/login");
const { register } = require("../controllers/register");

const SpeciesCon = require("../controllers/species");
const PetCon = require("../controllers/pet");
const UserCon = require("../controllers/user")

router.get("/", (req, res) => {
  res.send("<strong>Hello DumbWays Rumah Tengah</strong>");
});

router.post("/login", login);
router.post("/register", register);

router.post("/species", SpeciesCon.addSpecies);
router.get("/species", SpeciesCon.showAllSpecies);

router.get("/pets/", PetCon.indexPet);
router.post("/pet/", PetCon.addPet);
router.put("/pet/:id", auth, PetCon.updatePet);
router.delete("/pet/:id", auth, PetCon.deletePet);
router.get("/pet/:id", auth, PetCon.detailPet);

router.get("/user/:id", auth, UserCon.detailUser);
router.put("/user/:id", auth, UserCon.updateUser);
router.delete("/user/:id", auth, UserCon.deleteUser)

module.exports = router;
