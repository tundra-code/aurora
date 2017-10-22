import { bookshelf } from "./setup.js";

const Note = bookshelf.Model.extend(
  {
    tableName: "Notes",
    hasTimestamps: true,
    attribute: function() {
      return this.hasMany(Attribute, "note_id");
    }
  },
  {
    dependents: ["attribute"]
  }
);

const Attribute = bookshelf.Model.extend({
  tableName: "Attributes",
  hasTimestamps: true,
  note: function() {
    return this.belongsTo(Note, "note_id");
  }
});

export { Note, Attribute };
