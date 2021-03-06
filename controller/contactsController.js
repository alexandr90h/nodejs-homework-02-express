const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../model/index");

const getAll = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contacts = await listContacts(userId, req.query);
    res.json({
      status: "success",
      code: 200,
      data: { contacts },
    });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId);
    if (contact) {
      res.json({
        status: "success",
        code: 200,
        data: { contact },
      });
    } else {
      res.json({
        status: "error",
        code: 404,
        message: "Not found",
      });
    }
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contacts = await addContact({ ...req.body, owner: userId });
    res.json({
      status: "success",
      code: 201,
      data: { contacts },
    });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await removeContact(req.params.contactId, userId);
    if (contact) {
      return res.json({
        status: "success",
        code: 200,
        message: "contact deleted",
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Not found",
      });
    }
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await updateContact(req.params.id, req.body, userId);
    if (contact) {
      return res.json({
        status: "success",
        code: 200,
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Not found",
      });
    }
  } catch (e) {
    next(e);
  }
};
module.exports = { getAll, getById, create, remove, update };
