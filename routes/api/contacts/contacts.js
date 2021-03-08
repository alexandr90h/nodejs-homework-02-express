const express = require("express");
const router = express.Router();
const validate = require("./validation");
const controller = require("../../../controller/contactsController");
const guard = require("../../../helpers/guard");

router.get("/", guard, controller.getAll);

router.get("/:contactId", guard, controller.getById);

router.post("/", guard, validate.addContac, controller.create);

router.delete("/:contactId", guard, controller.remove);

router.patch("/:id", guard, validate.updateContact, controller.update);

module.exports = router;
