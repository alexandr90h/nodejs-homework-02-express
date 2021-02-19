const fs = require("fs/promises");
const path = require("path");
const db = require("./db");

const contactsPath = path.resolve(__dirname, "contacts.json");

const listContacts = async () => {
  return db.get("contacts").value();
  // const result = await fs.readFile(contactsPath, "utf8", (err, data) => {
  //   if (err) {
  //     console.error(err.message);
  //     return;
  //   }
  // });
  // return JSON.parse(result);
};

const getContactById = async (contactId) => {};

const removeContact = async (contactId) => {};

const addContact = async (body) => {};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
