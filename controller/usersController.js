const jwt = require("jsonwebtoken");
const { HttpCode } = require("../helpers/constants");
require("dotenv").config();
const SECRET_KEY = process.env.JWT_SECRET;
const Users = require("../model/users");

const reg = async (req, res, next) => {
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
      data: { email: newUser.email, subscription: newUser.subscription },
    });
  } catch (error) {
    next(error);
  }
};
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findByEmail(email);
    const isvalidPass = await user.validPassword(password);
    if (!user || !isvalidPass) {
      return res.status(HttpCode.UNAUTORIZED).json({
        status: "error",
        code: HttpCode.UNAUTORIZED,
        data: "UNAUTHORIZED",
        message: "Email or password is wrong",
      });
    }
    const { id, subscription } = user;
    const payload = { id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "2h" });
    await Users.updateToken(id, token);
    return res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.CREATE,
      data: {
        token,
        user: { email, subscription },
      },
    });
  } catch (error) {
    next(error);
  }
};
const logout = async (req, res, next) => {
  const id = req.user.id;
  await Users.updateToken(id, null);
  return res.status(HttpCode.NO_CONTENT).json();
};
const getUserInfo = async (req, res, next) => {
  const { email, subscription } = req.user;
  return res.status(HttpCode.OK).json({
    status: "success",
    code: HttpCode.OK,
    data: {
      email,
      subscription,
    },
  });
};

module.exports = { reg, login, logout, getUserInfo };
