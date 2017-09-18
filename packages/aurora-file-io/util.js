import Jetpack from "fs-jetpack";
const os = require("os"); // For some reason I cannot import using normal syntax so I have to do it this way.
import { convertToRaw } from "draft-js";

const noteFileExt = ".aur";

function getAuroraDirContext() {
  return Jetpack.dir(os.homedir()).dir(".aurora");
}

function attachMetaData(editorState) {
  const note = {
    contentState: convertToRaw(editorState.getCurrentContent()),
    date: new Date().getTime()
  };
  return note;
}

function noteFileName(note) {
  return note.date + noteFileExt; // name based on date to ensure uniqueness
}

export { getAuroraDirContext, attachMetaData, noteFileName, noteFileExt };
