import { EditorState } from "draft-js";
import _ from "lodash";

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

export const pickNoteFromAllNotes = allNotes => {
  const keys = Object.keys(allNotes);
  if (keys.length === 0) {
    return null;
  }

  return allNotes[keys[0]];
};

export const updateNoteInAllNotes = (note, allNotes) => {
  allNotes[note.uuid] = _.clone(note);

  return Object.assign({}, allNotes);
};

export const removeNoteFromAllNotes = (note, allNotes) => {
  delete allNotes[note.uuid];
  return Object.assign({}, allNotes);
};
