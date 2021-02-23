const { MongoClient } = require("mongodb");
require("dotenv").config();
const uriDb = process.env.URI_DB;
const db = MongoClient.connect(uriDb, {
  useUnifiedTopology: true,
  poolSize: 5,
});
process.on("SIGINT", async () => {
  const client = await db;
  client.close();
  console.log("Connection closed!!!");
  process.exit(1);
});
// const low = require("lowdb");
// const FileSync = require("lowdb/adapters/FileSync");

// const adapter = new FileSync("./model/contacts.json");
// const db = low(adapter);

// db.defaults({ contacts: [] }).write();
module.exports = db;
