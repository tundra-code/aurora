const DBMigrate = require("db-migrate");
import { auroraDirPath } from "../util.js";
//const dbfile = auroraDirPath() + "/" + process.env.NODE_ENV + ".db";
const dbfile = process.env.NODE_ENV + ".db";
const knex = require("knex")({
  client: "sqlite3",
  connection: {
    filename: dbfile
  }
});
const bookshelf = require("bookshelf")(knex);
const cascadeDelete = require("bookshelf-cascade-delete");
bookshelf.plugin(cascadeDelete);

//getting an instance of dbmigrate
const dbmigrate = DBMigrate.getInstance(true, {
  env: process.env.NODE_ENV,
  config: "config/database.json"
});

function loadDB() {
  return dbmigrate.up();
}

export { bookshelf, loadDB };
