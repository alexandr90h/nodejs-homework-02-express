const User = require("./schemas/users");
const findByEmail = async (email) => {
  return await User.findOne({ email });
};
const
const create = async ({name,email,password,sex}) => {
    const user = new User({ name, email, password, sex });
    return await user.save();
};

module.exports = { findByEmail, create };
