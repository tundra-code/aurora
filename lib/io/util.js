import jetpack from "fs-jetpack";
const os = require("os");

const noteFolder = "notes";
const databaseJSONFile = "database.json";

const noteFile = note => {
  return note.uuid + ".aur";
};

const auroraRootContext = () => {
  return jetpack.dir(os.homedir()).dir(".aurora");
};

const auroraDirContext = () => {
  return auroraRootContext().dir(process.env.NODE_ENV);
};

const auroraRootPath = () => {
  return auroraRootContext().cwd();
};

const configDir = () => {
  return jetpack.dir("config");
};

const dbFilePath = env => {
  return auroraRootPath() + "/" + env + "/" + env + ".db";
};

function executeIfDefined(callback, param) {
  if (callback !== undefined) {
    if (param !== undefined) {
      callback(param);
    } else {
      callback();
    }
  }
}

function saveTo(data, fileName, dirContext) {
  return dirContext.write(fileName, data);
}

function saveToAsync(data, fileName, dirContext, callback, onFailure) {
  dirContext
    .writeAsync(fileName, data)
    .then(() => {
      executeIfDefined(callback);
    })
    .catch(err => {
      onFailure(err);
    });
}

function saveNoteContent(note) {
  note.getContent(content => {
    saveToAsync(content, noteFile(note), auroraDirContext().dir(noteFolder));
  });
}

function deleteNoteContent(note) {
  auroraDirContext()
    .dir(noteFolder)
    .remove(noteFile(note));
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

function loadNoteContent(note, callback) {
  readFromAsync(noteFile(note), auroraDirContext().dir(noteFolder), callback);
}

function deleteFile(fileName, dirContext) {
  return dirContext.remove(fileName);
}

function dbConfigExists() {
  return configDir().exists(databaseJSONFile);
}

function writeDatabaseJSON(data) {
  return saveTo(data, databaseJSONFile, configDir());
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
  readFromAsync,
  executeIfDefined,
  dbConfigExists,
  writeDatabaseJSON,
  dbFilePath
};
