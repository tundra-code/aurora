import {
  getAuroraDirContext,
  noteFileExt,
  deleteNoteFrom,
  saveTo
} from "./util.js";
import { NoteModel } from "../aurora-note";

/**
 * save a NoteModel.
 */
function save(note) {
  if (!(note instanceof NoteModel)) {
    throw new Error("Attempted to save something that is not a NoteModel.");
  }
  const context = getAuroraDirContext();
  saveTo(note, context);
}

/**
 * Delete a note by it's ID
 */
function deleteNote(id) {
  const context = getAuroraDirContext();
  deleteNoteFrom(id, context);
}

/**
 * Loads notes one by one.
 */
function loadNotes(callback) {
  const context = getAuroraDirContext();
  const noteFiles = context.find({ matching: "*" + noteFileExt });

  noteFiles.forEach(file => {
    callback(NoteModel.fromFileData(context.read(file)));
  });
}

export { save, loadNotes, deleteNote };
