import { loadDB } from "./setup.js";
import { Note } from "./models.js";
import { deleteNoteContent } from "../util.js";

function cascadeDeleteNote(note, callback) {
  loadDB().then(() => {
    Note.forge({ id: note.id })
      .destroy()
      .then(() => {
        deleteNoteContent(note);
        callback();
      });
  });
}

export { cascadeDeleteNote };
