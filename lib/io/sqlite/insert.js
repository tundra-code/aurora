import { Attribute, Attributes, noteFromNoteModel } from "./models.js";
import { loadDB } from "./setup.js";
import { saveNoteContent } from "../util.js";
const Promise = require("bluebird");

function getAttributeModels(attributes, noteID) {
  const attrs = [];
  attributes.forEach(attr => {
    const a = new Attribute({
      key: attr.key,
      value: attr.value,
      note_id: noteID,
      searchable: attr.searchable
    });
    attrs.push(a);
  });
  return attrs;
}

function saveAttributes(note, savedNote, callback) {
  note.id = savedNote.id;
  const attributes = Attributes.forge(
    getAttributeModels(note.attributes, savedNote.id)
  );
  Promise.all(attributes.invokeMap("save")).then(() => {
    callback();
  });
}

function insertNote(note, callback, onFailure) {
  loadDB()
    .then(() => {
      const bookshelfNote = noteFromNoteModel(note);
      saveNoteContent(note);
      bookshelfNote
        .save()
        .then(savedNote => {
          saveAttributes(note, savedNote, callback);
        })
        .catch(err => {
          onFailure(err);
        });
    })
    .catch(err => {
      throw new Error("Failed to load database: " + err);
    });
}

export { insertNote };
