import { getAuroraDirContext, noteFileName, noteFileExt } from "./util.js";
import { NoteModel } from "../aurora-note";

function save(note) {
  if (!(note instanceof NoteModel)) {
    throw new Error("Attempted to save something that is not a NoteModel.");
  }
  const context = getAuroraDirContext();
  context.writeAsync(noteFileName(note), note.toJSON());
}

function deleteNote(uuid) {
  const context = getAuroraDirContext();
  context.removeAsync(uuid + noteFileExt);
}

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
