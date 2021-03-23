const User = require("./schemas/users");

const findByEmail = async (email) => {
  return await User.findOne({ email });
};

const findById = async (id) => {
  return await User.findOne({ _id: id });
};
const findByVerifyToken = async (verifyToken) => {
  return await User.findOne({ verifyToken });
};

const create = async ({ email, password, verify, verifyToken }) => {
  const user = new User({ email, password, verify, verifyToken });
  return await user.save();
};

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token });
};
const updateVerifyToken = async (id, verify, verifyToken) => {
  return await User.updateOne({ _id: id }, { verify, verifyToken });
};

const updateAvatar = async (id, avatarURL) => {
  return await User.updateOne({ _id: id }, { avatarURL });
};

module.exports = {
  findByEmail,
  create,
  findById,
  updateToken,
  updateAvatar,
  findByVerifyToken,
  updateVerifyToken,
};
