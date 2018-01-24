/**
 * A collection of utilities for working with Draft-js and editors in general
 */
import { EditorState, ContentState } from "draft-js";
import { serializeContent } from "./index";

/**
 * Returns an EditorState with the text already typed out for you!
 */
const editorStateFromText = text =>
  EditorState.createWithContent(ContentState.createFromText(text));

const emptyEditorState = () => EditorState.createEmpty();

const emptySerializedEditorState = () => {
  return serializeContent(emptyEditorState());
};

export { editorStateFromText, emptySerializedEditorState, emptyEditorState };
