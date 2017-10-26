import jetpack from "fs-jetpack";
const os = require("os");

const noteFile = note => {
  return note.uuid + ".aur";
};

const auroraDirContext = () => {
  return jetpack
    .dir(os.homedir())
    .dir(".aurora")
    .dir(process.env.NODE_ENV);
};

function saveTo(data, fileName, dirContext) {
  return dirContext.write(fileName, data);
}

function saveNoteContent(note) {
  const content = note.getContent();
  auroraDirContext()
    .dir("notes")
    .write(noteFile(note), content);
}

function loadNoteContent(note) {
  return auroraDirContext()
    .dir("notes")
    .read(noteFile(note));
}

function readFrom(fileName, dirContext) {
  return dirContext.read(fileName);
}

function deleteFile(fileName, dirContext) {
  return dirContext.remove(fileName);
}

export {
  auroraDirContext,
  saveTo,
  readFrom,
  deleteFile,
  saveNoteContent,
  loadNoteContent
};
