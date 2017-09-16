import Jetpack from "fs-jetpack";
const os = require("os"); // For some reason I cannot import using normal syntax so I have to do it this way.
import { convertToRaw, convertFromRaw, EditorState } from "draft-js";

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

function save(editorState) {
  const context = getAuroraDirContext();
  const note = attachMetaData(editorState);
  context.writeAsync(noteFileName(note), note);
}

function loadNotes(callback) {
  const context = getAuroraDirContext();
  const noteFiles = context.find({ matching: "*" + noteFileExt });
  const notes = [];
  noteFiles.forEach(file => {
    context.readAsync(file).then(data => {
      const contentState = convertFromRaw(JSON.parse(data).contentState);
      const editorState = EditorState.createWithContent(contentState);
      notes.push(editorState); // Just return editor state for now
      if (notes.length === noteFiles.length) {
        // this means all notes have been loaded
        callback(notes);
      }
    });
  });
}

export { save, loadNotes };
