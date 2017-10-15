import jetpack from "fs-jetpack";
const os = require("os"); // For some reason I cannot import using normal syntax so I have to do it this way.

const noteFileExt = ".aur";

function getAuroraDirContext() {
  if (process.env.NODE_ENV === "dev") {
    return jetpack.dir(os.homedir()).dir(".dev_aurora");
  }

  return jetpack.dir(os.homedir()).dir(".aurora");
}

function noteFileName(note) {
  return note.id + noteFileExt; // name based on date to ensure uniqueness
}

function saveTo(note, dirContext) {
  return dirContext.write(noteFileName(note), note.toJSON());
}

function deleteNoteFrom(id, dirContext) {
  return dirContext.remove(id + noteFileExt);
}

export {
  getAuroraDirContext,
  saveTo,
  deleteNoteFrom,
  noteFileName,
  noteFileExt
};
