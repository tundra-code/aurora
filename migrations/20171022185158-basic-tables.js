//"use strict";

let dbm;
let type;
let seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db
    .createTable("Notes", {
      id: { type: "int", primaryKey: true, autoIncrement: true },
      uuid: { type: "string", notNull: true },
      content: { type: "string" },
      created_at: { type: "int", notNull: true },
      updated_at: { type: "int", notNull: true }
    })
    .then(
      () => {
        db.createTable("Attributes", {
          id: { type: "int", primaryKey: true, autoIncrement: true },
          key: { type: "string", notNull: true },
          value: { type: "string", notNull: true },
          searchable: { type: "boolean", notNull: true },
          note_id: {
            type: "int",
            notNull: true,
            foreignKey: {
              name: "attribute_note_id_fk",
              table: "Notes",
              rules: {
                onDelete: "CASCADE",
                onUpdate: "RESTRICT"
              },
              mapping: "id"
            }
          },
          created_at: { type: "int", notNull: true },
          updated_at: { type: "int", notNull: true }
        });
      },
      () => {}
    );
};

exports.down = function(db) {
  return db.dropTable("Attributes").then(() => {
    db.dropTable("Notes");
  });
};

exports._meta = {
  version: 1
};
