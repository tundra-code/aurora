import { loadDB } from "./setup.js";
import { Note, Tag } from "./models.js";
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

function deleteTagFromDB(tag, callback, onFailure) {
  if (!tag.id) {
    throw new Error(
      "Attempting to delete a tag that has never recieved an SQLite id. This is probably bad."
    );
  }

  loadDB()
    .then(async () => {
      await Tag.forge({ id: tag.id })
        .destroy()
        .catch(err => {
          executeIfDefined(onFailure, err);
        });
      executeIfDefined(callback);
    })
    .catch(err => {
      throw new Error("Failed to load database: " + err);
    });
}

export { cascadeDeleteNote, deleteTagFromDB };
