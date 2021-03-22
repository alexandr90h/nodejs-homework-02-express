const jwt = require("jsonwebtoken");
const { HttpCode } = require("../helpers/constants");
require("dotenv").config();
const Jimp = require("jimp");
const path = require("path");
const fs = require("fs").promises;
// const { nanoid } = require("nanoid");
const { v4: uuidv4 } = require("uuid");

const SECRET_KEY = process.env.JWT_SECRET;
const EmailService = require("../services/email");
const Users = require("../model/users");
const createFolderIsExist = require("../helpers/createDir");
const User = require("../model/schemas/users");

const reg = async (req, res, next) => {
  try {
    const { email, name } = req.body;
    const user = await Users.findByEmail(email);
    if (user) {
      return res.status(HttpCode.FORBIDDEN).json({
        status: "error",
        code: HttpCode.FORBIDDEN,
        data: "Conflict",
        message: "Email is already use",
      });
    }
    const verifyToken = uuidv4();
    const emailService = new EmailService(process.env.NODE_ENV);
    await emailService.sendEmail(verifyToken, email, name);
    const newUser = await Users.create({
      ...req.body,
      veryfy: false,
      verifyToken,
    });
    return res.status(HttpCode.CREATE).json({
      status: "success",
      code: HttpCode.CREATE,
      data: {
        email: newUser.email,
        subscription: newUser.subscription,
        avatarURL: newUser.avatarURL,
      },
    });
  } catch (error) {
    next(error);
  }
};
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findByEmail(email);
    const isvalidPass = await user?.validPassword(password);
    if (!user || !isvalidPass || !user.verify) {
      return res.status(HttpCode.UNAUTORIZED).json({
        status: "error",
        code: HttpCode.UNAUTORIZED,
        data: "UNAUTHORIZED",
        message: "Email or password is wrong",
      });
    }
    const { id, subscription, avatarURL } = user;
    const payload = { id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "2h" });
    await Users.updateToken(id, token);
    return res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.CREATE,
      data: {
        token,
        user: { email, subscription, avatarURL },
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
  const { email, subscription, avatar } = req.user;
  return res.status(HttpCode.OK).json({
    status: "success",
    code: HttpCode.OK,
    data: {
      email,
      subscription,
      avatar,
    },
  });
};
const avatars = async (req, res, next) => {
  try {
    const id = req.user.id;
    const AVATARS_OF_USERS = process.env.AVATARS_OF_USERS;
    const pathFile = req.file.path;
    const newNameAvatar = `${Date.now()}-${req.file.originalname}`;
    const img = await Jimp.read(pathFile);
    await img
      .autocrop()
      .cover(
        250,
        250,
        Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE
      )
      .writeAsync(pathFile);
    await createFolderIsExist(path.join(AVATARS_OF_USERS, id));
    await fs.rename(pathFile, path.join(AVATARS_OF_USERS, id, newNameAvatar));
    const avatarURL = path.normalize(path.join(id, newNameAvatar));
    console.log(avatarURL);
    try {
      await fs.unlink(
        path.join(process.cwd(), AVATARS_OF_USERS, req.user.avatar)
      );
    } catch (error) {
      console.log(error.message);
    }
    await Users.updateAvatar(id, avatarURL);
    return res.json({
      status: "success",
      code: HttpCode.OK,
      data: {
        avatarURL,
      },
    });
  } catch (error) {
    next(error);
  }
};
const verify = async (req, res, next) => {
  try {
    const user = await Users.findByVerifyToken(req.params.token);
    if (user) {
      await Users.updateVerifyToken(user.id, true, null);
      return res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        message: "Verification successful!",
      });
    }
    return res.status(HttpCode.BAD_REQUEST).json({
      status: "error",
      code: HttpCode.BAD_REQUEST,
      data: "Bad request",
      message: `Link is not valid`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { reg, login, logout, getUserInfo, avatars, verify };
