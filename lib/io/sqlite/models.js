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

const Attributes = bookshelf.Collection.extend({
  model: Attribute
});

function noteFromNoteModel(note) {
  return new Note({
    uuid: note.uuid,
    mutationName: note.mutationName
  });
}

function attrFromAttrModel(attr, noteID) {
  return new Attribute({
    key: attr.key,
    value: attr.value,
    note_id: noteID,
    searchable: attr.searchable
  });
}

export { Note, Attribute, Attributes, noteFromNoteModel, attrFromAttrModel };
