import Jetpack from "fs-jetpack";
const os = require("os"); // For some reason I cannot import using normal syntax so I have to do it this way.

const noteFileExt = ".aur";

function getAuroraDirContext() {
  return Jetpack.dir(os.homedir()).dir(".aurora");
}
function noteFileName(note) {
  return note.id + noteFileExt; // name based on date to ensure uniqueness
}

export { getAuroraDirContext, noteFileName, noteFileExt };
