const express = require("express");
const router = express.Router();
const validate = require("./validation");
const controller = require("../../../controller/usersController");

router.post("/registration");
router.post("/login");
router.post("/logout");

module.exports = router;
