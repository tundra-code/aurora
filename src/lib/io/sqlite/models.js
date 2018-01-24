import { bookshelf } from "./setup.js";

let Attribute = bookshelf.Model;
let Tag = bookshelf.Model;

const Note = bookshelf.Model.extend(
  {
    tableName: "Notes",
    hasTimestamps: true,
    attribute: function() {
      return this.hasMany(Attribute, "note_id");
    },
    tag: function() {
      return this.hasMany(Tag, "note_id");
    }
  },
  {
    dependents: ["attribute", "tag"]
  }
);

Attribute = bookshelf.Model.extend({
  tableName: "Attributes",
  hasTimestamps: true,
  note: function() {
    return this.belongsTo(Note, "note_id");
  }
});

Tag = bookshelf.Model.extend({
  tableName: "Tags",
  hasTimestamps: true,
  note: function() {
    return this.belongsTo(Note, "note_id");
  }
});

const Attributes = bookshelf.Collection.extend({
  model: Attribute
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

function attrFromAttrModel(attr, noteID) {
  return new Attribute({
    id: attr.id,
    key: attr.key,
    value: attr.value,
    note_id: noteID,
    searchable: attr.searchable
  });
}

function tagFromTagModel(tag, noteID) {
  return new Tag({
    id: tag.id,
    value: tag.value,
    note_id: noteID
  });
}

export {
  Note,
  Attribute,
  Attributes,
  noteFromNoteModel,
  attrFromAttrModel,
  tagFromTagModel,
  Tag,
  Tags
};
