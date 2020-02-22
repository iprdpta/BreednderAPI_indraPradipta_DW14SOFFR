const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");

const { login } = require("../controllers/login");
const { register } = require("../controllers/register");

const SpeciesCon = require("../controllers/species");
const PetCon = require("../controllers/pet");
const UserCon = require("../controllers/user");
const PaymenCon = require("../controllers/payment");
const MatchCon = require("../controllers/match")

router.get("/", (req, res) => {
  res.send("<strong>Hello DumbWays Rumah Tengah</strong>");
});

router.post("/login", login);
router.post("/register", register);

router.post("/species", SpeciesCon.addSpecies);
router.get("/species", SpeciesCon.showAllSpecies);

router.get("/pets/", auth, PetCon.indexPet);
router.post("/pet/", auth, PetCon.addPet);
router.put("/pet/:id", auth, PetCon.updatePet);
router.delete("/pet/:id", auth, PetCon.deletePet);
router.get("/pet/:id", auth, PetCon.detailPet);

router.get("/user/:id", auth, UserCon.detailUser);
router.put("/user/:id", auth, UserCon.updateUser);
router.delete("/user/:id", auth, UserCon.deleteUser)

router.post("/match", auth, MatchCon.create);
router.get("/match", auth, MatchCon.check);
router.put("/match/:id", auth, MatchCon.update);

router.post("/payment/", auth, PaymenCon.addPayment);
router.put("/payment/:id", auth, PaymenCon.updatePayment);

module.exports = router;
