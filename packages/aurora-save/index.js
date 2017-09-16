import {
  getAuroraDirContext,
  attachMetaData,
  noteFileName,
  noteFileExt
} from "./util.js";
import { convertFromRaw, EditorState } from "draft-js";

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
