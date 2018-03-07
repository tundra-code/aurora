import { EditorState } from "draft-js";
import _ from "lodash";
import { noteDictToArray, noteArrayToDict } from "../../lib/note/util";

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

export const indexOfNoteInArray = (noteArr, note) => {
  return noteArr.map(n => n.uuid).indexOf(note.uuid);
};

export const pickPreviousNoteInList = (allNotes, selectedNote) => {
  const noteArr = noteDictToArray(allNotes);

  // Don't return anything if we have no other notes to pick from
  if (noteArr.length === 0 || noteArr.length === 1) {
    return null;
  }

  let index = indexOfNoteInArray(noteArr, selectedNote);

  // Just make sure we're not doing anything screwy
  if (index === -1) {
    throw new Error(
      `pickPreviousNoteInList called with a note that doesn't exist. Selected note is: ${
        selectedNote
      }. Did you try to select a note that you deleted somehow? This may happen if you call
      a "deleteNote" action before a "selectNote" action.
      `
    );
  }

  // If select the item "up", do that, otherwise go down.
  if (index > 0) {
    index -= 1;
  } else {
    index += 1;
  }

  return noteArr[index];
};

export const moveNoteToFront = (note, allNotes) => {
  const noteArr = noteDictToArray(allNotes);
  // Remove note from list and place it at front.
  for (let i = 0; i < noteArr.length; i++) {
    if (noteArr[i].uuid === note.uuid) {
      const n = noteArr.splice(i, 1); // removes the item
      noteArr.unshift(n[0]); // adds it back to the beginning
      break;
    }
  }
  return Object.assign({}, noteArrayToDict(noteArr));
};

export const updateNoteInAllNotes = (note, allNotes) => {
  allNotes[note.uuid] = _.clone(note);

  return Object.assign({}, allNotes);
};

export const removeNoteFromAllNotes = (note, allNotes) => {
  delete allNotes[note.uuid];
  return Object.assign({}, allNotes);
};
