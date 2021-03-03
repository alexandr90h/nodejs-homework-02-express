const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const bcrypt = require("bcryptjs");
const { Sex } = require("../../helpers/constants");
SALT_WORK_FACTOR = 8;

const usersSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 2,
      default: "Guest",
    },
    sex: {
      type: String,
      emum: {
        value: [Sex.MALE, Sex.FEMALE, Sex.NONE],
        message: "It isn't allowed",
      },
      default: Sex.NONE,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      validate(value) {
        const re = /\S+@\S+\.\S+/;
        return re.test(String(value).toLowerCase());
      },
    },
    password: { type: String, required: [true, "pasword required"] },
    token: { type: String, default: nall },
  },
  { versionKey: false, timestamps: true }
);
usersSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  this.password = await bcrypt.hash(this.password, salt, null);
  next();
});
usersSchema.methods.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
const User = model("user", userSchema);
module.exports = User;
