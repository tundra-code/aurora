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
  return note["date"];
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
      var json = JSON.parse(data);
      const contentState = convertFromRaw(json.contentState);
      const editorState = EditorState.createWithContent(contentState);
      var note = {
        "uuid":json["date"],
        "editorState":editorState
      }
      notes.push(note);
      if (notes.length === noteFiles.length) { // this means all notes have been loaded
        callback(notes);
      }
    });
  });
}

export { save, loadNotes, deleteNote };
