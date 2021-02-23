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

  // return db.get("contacts").find({ _id }).value();
};

const removeContact = async (id) => {
  const [record] = db.get("contacts").remove({ id }).write();
  return record;
};

const addContact = async (body) => {
  const record = { ...body };
  const collection = await getColection(db, "contacts");
  const {
    ops: [results],
  } = await collection.insertOne(record);
  // db.get("contacts").push(record).write();
  return results;
};

const updateContact = async (id, body) => {
  const record = db.get("contacts").find({ id }).assign(body).value();
  db.write();
  return record.id ? record : null;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
