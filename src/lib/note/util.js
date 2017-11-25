import { ContentState, EditorState } from "draft-js";
import { serializeContent } from "../editor/EditorSerializer";
import NoteModel from "./Note";

/**
 * Creates a basic NoteModel with some text
 * @param {String} text
 * @return {NoteModel}
 */
export const newNote = text => {
  return new NoteModel(
    serializeContent(
      text
        ? EditorState.createWithContent(ContentState.createFromText(text))
        : EditorState.createEmpty()
    ),
    "BaseEditor",
    [],
    [],
    []
  );
};

/**
 * Converts a note array to a note dictionary
 */
export const noteArrayToDict = notes => {
  const dict = {};
  notes.forEach(note => {
    dict[note.uuid] = note;
  });
  return dict;
};

/**
 * Converts a note dictionary to an array.
 * @param {Dictionary} noteDict
 */
export const noteDictToArray = noteDict => {
  const noteList = [];
  for (const uuid in noteDict) {
    noteList.push(noteDict[uuid]);
  }
  return noteList;
};
