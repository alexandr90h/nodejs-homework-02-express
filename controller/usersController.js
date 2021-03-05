const jwt = require("jsonwebtoken");
const { HttpCode } = require("../helpers/constants");
require("dotenv").config();
const SECRET_KEY = process.env.JWT_SECRET;
const { Users } = require("../model/users");

const reg = async (_req, res, next) => {
  try {
    const { email } = req.body;
    const user = await Users.findByEmail(email);
    if (user) {
      return res.status(HttpCode.FORBIDDEN).json({
        status: "error",
        code: HttpCode.FORBIDDEN,
        data: "Conflict",
        message: "Email is already use",
      });
    }
    const newUser = await Users.create(req.body);
    return res.status(HttpCode.CREATE).json({
      status: "success",
      code: HttpCode.CREATE,
      data: { id: newUser.id, email: newUser.email, name: newUser.name },
    });
  } catch (error) {
    next(error);
  }
};
const login = async (req, res, next) => {};
const logout = async (req, res, next) => {};

module.exports = { reg, login, logout };
