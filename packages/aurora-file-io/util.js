import jetpack from "fs-jetpack";
const os = require("os"); // For some reason I cannot import using normal syntax so I have to do it this way.

const noteFileExt = ".aur";

function getAuroraDirContext() {
  return jetpack.dir(os.homedir()).dir(".aurora");
}

function noteFileName(note) {
  return note.id + noteFileExt; // name based on date to ensure uniqueness
}

function saveTo(note, dirContext) {
  return dirContext.writeAsync(noteFileName(note), note.toJSON());
}

function deleteNoteFrom(id, dirContext) {
  return dirContext.removeAsync(id + noteFileExt);
}

export {
  getAuroraDirContext,
  saveTo,
  deleteNoteFrom,
  noteFileName,
  noteFileExt
};
