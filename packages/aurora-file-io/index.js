import {
  getAuroraDirContext,
  noteFileExt,
  deleteNoteFrom,
  saveTo
} from "./util.js";
import { NoteModel } from "../aurora-note";

/**
 * Asynchronously save a NoteModel.
 */
function save(note) {
  if (!(note instanceof NoteModel)) {
    throw new Error("Attempted to save something that is not a NoteModel.");
  }
  const context = getAuroraDirContext();
  saveTo(note, context);
}

/**
 * Asynchronously delete a note by it's ID
 */
function deleteNote(id) {
  const context = getAuroraDirContext();
  deleteNoteFrom(id, context);
}

/**
 * Asynchronously load notes
 */
function loadNotes(callback) {
  const context = getAuroraDirContext();
  const noteFiles = context.find({ matching: "*" + noteFileExt });
  const notes = [];

  noteFiles.forEach(file => {
    context.readAsync(file).then(data => {
      notes.push(NoteModel.fromFileData(data));
      const allNotesAreLoaded = notes.length === noteFiles.length;
      if (allNotesAreLoaded) {
        callback(notes);
      }
    });
  });
}

export { save, loadNotes, deleteNote };
