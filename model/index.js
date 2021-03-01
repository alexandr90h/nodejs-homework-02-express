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
