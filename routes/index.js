const express = require("express");
const router = express.Router();

const { login } = require("../controllers/login");
const { register } = require("../controllers/register");


// const { auth } = require("../middleware/auth");

router.get("/", (req, res) => {
  res.send("<strong>Hello DumbWays Rumah Tengah</strong>");
});

router.post("/login", login);
router.post("/register", register);

module.exports = router;