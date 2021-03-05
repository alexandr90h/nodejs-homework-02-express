const express = require("express");
const router = express.Router();
const validate = require("./validation");
const controller = require("../../../controller/usersController");

router.post("/registration", controller.reg);
router.post("/login", controller.login);
router.post("/logout", controller.logout);

module.exports = router;
