const jwt = require("jsonwebtoken");
const { HttpCode } = require("../helpers/constants");
require("dotenv").config();
const SECRET_KEY = process.env.JWT_SECRET;
const { Users } = require("../model/users");

const reg = async (_req, res, next) => {
  try {
    const { name, email, password, sex } = req.body;
    const user = await Users.findByEmail(email);

    const contacts = await listContacts();
    res.json({
      status: "success",
      code: 200,
      data: { contacts },
    });
  } catch (error) {
    next(error);
  }
};
