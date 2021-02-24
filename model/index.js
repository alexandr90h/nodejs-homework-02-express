const db = require("./db");
const { ObjectId } = require("mongodb");

const getColection = async (db, name) => {
  const client = await db;
  const collection = await client.db().collection(name);
  return collection;
};

const listContacts = async () => {
  const collection = await getColection(db, "contacts");
  const results = await collection.find({}).toArray();
  return results;
};

const getContactById = async (id) => {
  const collection = await getColection(db, "contacts");
  const objectId = new ObjectId(id);
  const results = await collection.find({ _id: objectId }).toArray();
  return results;
};

const addContact = async (body) => {
  const record = {
    ...body,
    ...(body.subscription ? {} : { subscription: "free" }),
    ...(body.password ? {} : { password: "password" }),
    ...(body.token ? {} : { token: "" }),
  };
  const collection = await getColection(db, "contacts");
  const {
    ops: [results],
  } = await collection.insertOne(record);
  return results;
};

const updateContact = async (id, body) => {
  const collection = await getColection(db, "contacts");
  const objectId = new ObjectId(id);
  const { value: results } = await collection.findOneAndUpdate(
    { _id: objectId },
    { $set: body },
    { returnOriginal: false }
  );
  return results;
};

const removeContact = async (id) => {
  const collection = await getColection(db, "contacts");
  const objectId = new ObjectId(id);
  const { value: results } = await collection.findOneAndDelete({
    _id: objectId,
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
