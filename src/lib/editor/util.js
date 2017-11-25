/**
 * A collection of utilities for working with Draft-js and editors in general
 */
import { EditorState, ContentState } from "draft-js";
import { serializeContent, EDITOR_NAME } from "./index";
import { NoteModel } from "../note";

/**
 * Returns an EditorState with the text already typed out for you!
 */
const editorStateFromText = text =>
  EditorState.createWithContent(ContentState.createFromText(text));

const emptyEditorState = () => EditorState.createEmpty();

const emptySerializedEditorState = () => {
  return serializeContent(emptyEditorState());
};

const noteWithEmptyEditor = () => {
  return new NoteModel(emptySerializedEditorState(), EDITOR_NAME, [], []);
};

export {
  editorStateFromText,
  emptySerializedEditorState,
  emptyEditorState,
  noteWithEmptyEditor
};
