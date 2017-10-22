import { Note, Attribute } from "./models.js";
import { loadDB } from "./setup.js";

function insertNote(note, callback) {
  loadDB()
    .then(() => {
      const n = new Note({ uuid: note.uuid, content: note.content });
      n.save().then(savedNote => {
        note.attributes.foreEach(attr => {
          const a = new Attribute({
            key: attr.key,
            value: attr.value,
            note_id: savedNote.note_id,
            searchable: attr.searchable
          });
          a.save();
        });
        callback();
      });
    })
    .catch(error => {
      console.log("error: " + error);
    });
}

export { insertNote };
