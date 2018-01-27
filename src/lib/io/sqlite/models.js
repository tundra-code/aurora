import { bookshelf } from "./setup.js";

let Tag = bookshelf.Model;

const Note = bookshelf.Model.extend(
  {
    tableName: "Notes",
    hasTimestamps: true,
    tag: function() {
      return this.hasMany(Tag, "note_id");
    }
  },
  {
    dependents: ["tag"]
  }
);

Tag = bookshelf.Model.extend({
  tableName: "Tags",
  hasTimestamps: true,
  note: function() {
    return this.belongsTo(Note, "note_id");
  }
});

const Tags = bookshelf.Collection.extend({
  model: Tag
});

function noteFromNoteModel(note) {
  return new Note({
    id: note.id,
    uuid: note.uuid,
    mutationName: note.mutationName,
    preview: JSON.stringify(note.getPreview())
  });
}

function tagFromTagModel(tag, noteID) {
  return new Tag({
    id: tag.id,
    value: tag.value,
    note_id: noteID,
    uuid: tag.uuid
  });
}

export { Note, noteFromNoteModel, tagFromTagModel, Tag, Tags };
