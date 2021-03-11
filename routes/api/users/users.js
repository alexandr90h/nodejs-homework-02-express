const express = require("express");
const router = express.Router();
const validate = require("./validation");
const controller = require("../../../controller/usersController");
const guard = require("../../../helpers/guard");

router.post("/register", validate.create, controller.reg);
router.post("/login", validate.login, controller.login);
router.post("/logout", guard, controller.logout);
router.get("/current", guard, controller.getUserInfo);

module.exports = router;
