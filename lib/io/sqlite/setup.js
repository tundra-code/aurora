const DBMigrate = require("db-migrate");
const dbfile = "./" + process.env.NODE_ENV + ".db";
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
  env: process.env.NODE_ENV
});

function loadDB() {
  return dbmigrate.up();
}

export { bookshelf, loadDB };
