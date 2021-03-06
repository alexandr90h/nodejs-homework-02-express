const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
SALT_WORK_FACTOR = 8;
const gravatar = require("gravatar");

const usersSchema = new Schema(
  {
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
    subscription: {
      type: String,
      enum: ["free", "pro", "premium"],
      default: "free",
    },
    avatarURL: {
      type: String,
      default: function () {
        return gravatar.url(this.email, { s: "250" }, true);
      },
    },
    token: { type: String, default: null },
    verify: {
      type: Boolean,
      default: false,
    },
    verifyToken: {
      type: String,
      required: [true, "Veryfy token required"],
    },
  },
  { versionKey: false, timestamps: true }
);
usersSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  this.password = await bcrypt.hash(this.password, salt, null);
  return next();
});

usersSchema.methods.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
const User = model("user", usersSchema);
module.exports = User;
