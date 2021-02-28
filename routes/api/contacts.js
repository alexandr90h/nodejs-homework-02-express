const express = require("express");
const router = express.Router();
const validate = require("./validation");
const controller = require("../../controller/contactsController");

router.get("/", controller.getAll);

router.get("/:contactId", controller.getById);

router.post("/", validate.addContac, controller.create);

router.delete("/:contactId", controller.remove);

router.patch("/:id", validate.updateContact, controller.update);

module.exports = router;
