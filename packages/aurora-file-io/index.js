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
  return note.date;
}

function deleteNote(id) {
  const context = getAuroraDirContext();
  context.removeAsync(id + noteFileExt);
}

function loadNotes(callback) {
  const context = getAuroraDirContext();
  const noteFiles = context.find({ matching: "*" + noteFileExt });
  const notes = [];

  noteFiles.forEach(file => {
    context.readAsync(file).then(data => {
      const json = JSON.parse(data);
      const contentState = convertFromRaw(json.contentState);
      const editorState = EditorState.createWithContent(contentState);
      const note = {
        id: json.date,
        editorState: editorState
      };
      notes.push(note);
      const allNotesAreLoaded = notes.length === noteFiles.length;
      if (allNotesAreLoaded) {
        callback(notes);
      }
    });
  });
}

export { save, loadNotes, deleteNote };
