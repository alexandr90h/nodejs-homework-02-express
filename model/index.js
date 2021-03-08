const Contact = require("./schemas/contact");

const listContacts = async (userId) => {
  const results = await Contact.find({ owner: userId }).populate({
    path: "owner",
    select: "email subscription -_id",
  });
  return results;
};

const getContactById = async (id, userId) => {
  const [results] = await Contact.find({ _id: id, owner: userId });
  return results;
};

const addContact = async (body) => {
  const results = await Contact.create(body);
  return results;
};

const updateContact = async (id, body, userId) => {
  const results = await Contact.findByIdAndUpdate(
    { _id: id, owner: userId },
    { ...body },
    { new: true }
  );
  return results;
};

const removeContact = async (id, userId) => {
  const results = await Contact.findByIdAndDelete({
    _id: id,
    owner: userId,
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
