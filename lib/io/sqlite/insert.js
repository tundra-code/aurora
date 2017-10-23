import { Note, Attribute, Attributes } from "./models.js";
import { loadDB } from "./setup.js";
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

function insertNote(note, callback) {
  loadDB()
    .then(() => {
      const n = new Note({
        uuid: note.uuid,
        content: JSON.stringify(note.content)
      });
      n.save().then(savedNote => {
        note.id = savedNote.id;
        const attributes = Attributes.forge(
          getAttributeModels(note.attributes, savedNote.id)
        );
        Promise.all(attributes.invokeMap("save")).then(() => {
          callback();
        });
      });
    })
    .catch(error => {
      console.log("error: " + error);
    });
}

export { insertNote };
