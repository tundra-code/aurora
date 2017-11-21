import { EditorState, EDITOR_NAME } from "draft-js";
import { NoteModel } from "../../lib/note";
import { serializeContent } from "../../lib/editor";

export const notesToDict = notes => {
  const dict = {};
  notes.forEach(note => {
    dict[note.uuid] = note;
  });
  return dict;
};

export const updateNote = (note, notesDict) => {
  notesDict[note.uuid] = note;
};

export const firstNoteIfDefined = notes => {
  if (notes.length > 0) {
    return notes[0];
  }
  return null;
};

export const emptyEditorState = () => {
  return EditorState.createEmpty();
};

export const updateNoteInAllNotes = (note, allNotes) => {
  allNotes[note.uuid] = Object.assign({}, note);
  return Object.assign({}, allNotes);
};

export const removeNoteFromAllNotes = (note, allNotes) => {
  delete allNotes[note.uuid];
  return Object.assign({}, allNotes);
};

export const newEmptyNote = () => {
  const content = serializeContent(emptyEditorState());
  return new NoteModel(content, EDITOR_NAME);
};
