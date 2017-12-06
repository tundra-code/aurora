import { loadDB } from "./setup.js";
import { Note } from "./models.js";
import { deleteNoteContent, executeIfDefined } from "../util.js";

function cascadeDeleteNote(note, callback, onFailure) {
  if (!note.id) {
    throw new Error(
      "Attempting to delete a note that has never recieved an SQLite id. This is probably bad."
    );
  }

  loadDB()
    .then(async () => {
      await Note.forge({ id: note.id })
        .destroy()
        .catch(err => {
          executeIfDefined(onFailure, err);
        });
      deleteNoteContent(note);
      executeIfDefined(callback);
    })
    .catch(err => {
      throw new Error("Failed to load database: " + err);
    });
}

export { cascadeDeleteNote };
