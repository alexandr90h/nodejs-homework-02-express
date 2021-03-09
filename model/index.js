const Contact = require("./schemas/contact");

const listContacts = async (
  userId
  // { sortBy, filter, limit = 5, offset = 0 }
) => {
  const results = await Contact.paginate(
    { owner: userId }
    // {
    //   limit,
    //   offset,
    //   populate: { path: "owner", select: "name email -_id" },
    // }
  );
  return results;
  // const { docs: conracts, totalDocs: total } = results;
  // return { total, limit, offset, page, conracts };
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
  const results = await Contact.findOneAndUpdate(
    { _id: id, owner: userId },
    { ...body },
    { new: true }
  );
  return results;
};

const removeContact = async (id, userId) => {
  const results = await Contact.findOneAndRemove({
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
