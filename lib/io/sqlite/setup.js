import {
  dbFilePath,
  readDatabaseJSON,
  writeDatabaseJSON,
  auroraDirContext
} from "../util.js";
const ENVs = ["test", "prod", "dev"];

function updateDatabaseJSON() {
  const json = JSON.parse(readDatabaseJSON());
  const newJSON = JSON.parse(JSON.stringify(json));
  for (const env of ENVs) {
    newJSON[env].filename = dbFilePath(env);
  }
  if (json !== newJSON) {
    writeDatabaseJSON(newJSON);
  }
}

function ensureDirExists() {
  auroraDirContext();
}

updateDatabaseJSON();
ensureDirExists();
const DBMigrate = require("db-migrate");
const dbfile = dbFilePath(process.env.NODE_ENV);
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

export { bookshelf, loadDB, updateDatabaseJSON };
