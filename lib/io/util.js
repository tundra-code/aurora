import jetpack from "fs-jetpack";
const os = require("os");

const noteFolder = "notes";

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

function saveToAsync(data, fileName, dirContext, callback, onFailure) {
  dirContext
    .writeAsync(fileName, data)
    .then(() => {
      callback();
    })
    .catch(err => {
      onFailure(err);
    });
}

function saveNoteContent(note) {
  const content = note.getContent();
  auroraDirContext()
    .dir(noteFolder)
    .write(noteFile(note), content);
}

function deleteNoteContent(note) {
  auroraDirContext()
    .dir(noteFolder)
    .remove(noteFile(note));
}

function loadNoteContent(note) {
  return auroraDirContext()
    .dir(noteFolder)
    .read(noteFile(note));
}

function readFrom(fileName, dirContext) {
  return dirContext.read(fileName);
}

function readFromAsync(fileName, dirContext, callback, onFailure) {
  dirContext
    .readAsync(fileName)
    .then(data => {
      callback(data);
    })
    .catch(err => {
      onFailure(err);
    });
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
  loadNoteContent,
  deleteNoteContent,
  saveToAsync,
  readFromAsync
};
