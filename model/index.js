// const db = require("./db");
// const { ObjectId } = require("mongodb");

// const getColection = async (db, name) => {
//   const client = await db;
//   const collection = await client.db().collection(name);
//   return collection;
// };
const Contact = require("./schemas/contact");

const listContacts = async () => {
  const results = await Contact.find({});
  return results;
};

const getContactById = async (id) => {
  const [results] = await Contact.find({ _id: id });
  return results;
};

const addContact = async (body) => {
  const results = await Contact.create(body);
  // const record = {
  //   ...body,
  //   ...(body.subscription ? {} : { subscription: "free" }),
  //   ...(body.password ? {} : { password: "password" }),
  //   ...(body.token ? {} : { token: "" }),
  // };
  // const collection = await getColection(db, "contacts");
  // const {
  //   ops: [results],
  // } = await collection.insertOne(record);
  return results;
};

const updateContact = async (id, body) => {
  const results = await Contact.findByIdAndUpdate(
    { _id: id },
    { ...body },
    { new: true }
  );
  return results;
};

const removeContact = async (id) => {
  const results = await Contact.findByIdAndDelete({
    _id: id,
  });
  return results;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
