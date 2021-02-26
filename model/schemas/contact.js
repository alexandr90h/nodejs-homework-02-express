const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const contactSchema = new Schema(
  {
    name: { type: String, required: [true, "Set name"], unique: true },
    email: { type: String },
    phone: { type: String },
    subscription: { type: String, default: "free" },
    password: { type: String, default: "password" },
    token: { type: String, default: "" },
  },
  { versionKey: false, timestamps: true }
);

const Contact = model("contact", contactSchema);
module.exports = Contact;
