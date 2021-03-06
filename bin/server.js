const app = require("../app");
const db = require("../model/db");
const createFolderIsExist = require("../helpers/createDir");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
db.then(() => {
  app.listen(PORT, async () => {
    const UPLOAD_DIR = process.env.UPLOAD_DIR;
    const AVATARS_OF_USERS = process.env.AVATARS_OF_USERS;
    await createFolderIsExist(UPLOAD_DIR);
    await createFolderIsExist(AVATARS_OF_USERS);
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
}).catch((error) => {
  console.log(`Server not running: ${error.message}`);
  process.exit(1);
});
