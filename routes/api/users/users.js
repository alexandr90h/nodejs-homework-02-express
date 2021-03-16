const express = require("express");
const router = express.Router();
const validate = require("./validation");
const controller = require("../../../controller/usersController");
const guard = require("../../../helpers/guard");
const upload = require("../../../helpers/upload");

router.post(
  "/register",
  upload.single("avatar"),
  validate.create,
  controller.reg
);
router.post("/login", validate.login, controller.login);
router.post("/logout", guard, controller.logout);
router.get("/current", guard, controller.getUserInfo);
router.patch(
  "/avatars",
  guard,
  upload.single("avatar"),
  validate.uploadAvatar,
  controller.avatars
);
module.exports = router;
