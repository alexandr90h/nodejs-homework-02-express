const mongoose = require("mongoose");
const { Schema, model, SchemaTypes } = mongoose;
const mongoosePaginate = require("mongoose-paginate-v2");

const contactSchema = new Schema(
  {
    name: { type: String, required: [true, "Set name"], unique: true },
    email: { type: String },
    phone: { type: String },
    subscription: { type: String, default: "free" },
    password: { type: String, default: "password" },
    token: { type: String, default: "" },
    owner: { type: SchemaTypes.ObjectId, ref: "user" },
  },
  { versionKey: false, timestamps: true }
);
contactSchema.plugin(mongoosePaginate);
const Contact = model("contact", contactSchema);
module.exports = Contact;
