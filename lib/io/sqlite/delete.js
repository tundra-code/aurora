import { loadDB } from "./setup.js";
import { Note } from "./models.js";
import { deleteNoteContent } from "../util.js";

function cascadeDeleteNote(note, callback, onFailure) {
  loadDB()
    .then(() => {
      Note.forge({ id: note.id })
        .destroy()
        .then(() => {
          deleteNoteContent(note);
          callback();
        })
        .catch(err => {
          onFailure(err);
        });
    })
    .catch(err => {
      throw new Error("Failed to load database: " + err);
    });
}

export { cascadeDeleteNote };
