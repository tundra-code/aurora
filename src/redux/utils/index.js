import { EditorState } from "draft-js";

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
    return notes[0].uuid;
  }
  return null;
};

export const emptyEditorState = () => {
  return EditorState.createEmpty();
};

export const updateNoteInAllNotes = (allNotes, note) => {
  allNotes[note.uuid] = note;
  return allNotes;
};
