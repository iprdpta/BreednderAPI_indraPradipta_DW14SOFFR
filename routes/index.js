const express = require("express");
const router = express.Router();

const { login } = require("../controllers/login");
const { register } = require("../controllers/register");
const  species  = require("../controllers/species");



// const { auth } = require("../middleware/auth");

router.get("/", (req, res) => {
  res.send("<strong>Hello DumbWays Rumah Tengah</strong>");
});

router.post("/login", login);
router.post("/register", register);

router.post("/species", species.addSpecies);
router.get("/species", species.showAllSpecies);

module.exports = router;