// const fs = require('fs/promises')
// const path = require('path')
const db = require("./db");
const { v4: uuid } = require("uuid");

// const contactsPath = path.resolve(__dirname, 'contacts.json')

const listContacts = async () => {
  return db.get("contacts").value();
};

const getContactById = async (id) => {
  return db.get("contacts").find({ id }).value();
};

const removeContact = async (id) => {
  const [record] = db.get("contacts").remove({ id }).write();
  return record;
};

const addContact = async (body) => {
  const id = uuid();
  const record = { id, ...body };
  db.get("contacts").push(record).write();
  return record;
};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
