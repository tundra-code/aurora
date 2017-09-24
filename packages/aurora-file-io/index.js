import util from "./util.js";
import { NoteModel } from "../aurora-note";

/**
 * Asynchronously save a NoteModel.
 */
function save(note) {
  if (!(note instanceof NoteModel)) {
    throw new Error("Attempted to save something that is not a NoteModel.");
  }
  const context = util.getAuroraDirContext();
  context.writeAsync(util.noteFileName(note), note.toJSON());
}

/**
 * Asynchronously delete a note by it's ID
 */
function deleteNote(id) {
  const context = util.getAuroraDirContext();
  context.removeAsync(id + util.noteFileExt);
}

/**
 * Asynchronously load notes
 */
function loadNotes(callback) {
  const context = util.getAuroraDirContext();
  const noteFiles = context.find({ matching: "*" + util.noteFileExt });
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

export { save, loadNotes, deleteNote, util };
