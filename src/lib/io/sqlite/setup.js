import {
  dbFilePath,
  dbConfigExists,
  writeDatabaseJSON,
  auroraDirContext
} from "../util.js";
const ENVs = ["test", "production", "development"];

function createDatabaseConfig() {
  if (dbConfigExists()) {
    return;
  }
  const json = {
    defaultEnv: {
      ENV: "NODE_ENV"
    }
  };
  for (const env of ENVs) {
    json[env] = {
      driver: "sqlite3",
      user: "root",
      filename: dbFilePath(env)
    };
  }
  writeDatabaseJSON(json);
}

function ensureDirExists() {
  auroraDirContext();
}

createDatabaseConfig();
ensureDirExists();
const DBMigrate = require("db-migrate");
const dbfile = dbFilePath(process.env.NODE_ENV);
const knex = require("knex")({
  client: "sqlite3",
  connection: {
    filename: dbfile
  },
  useNullAsDefault: true
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
  if (global.DB_IS_UP) {
    return new Promise(res => res());
  }

  global.DB_IS_UP = true;
  dbmigrate.silence(true);
  return dbmigrate.up();
}

export { bookshelf, loadDB, createDatabaseConfig, ensureDirExists };
