/**
 * A collection of utilities for working with Draft-js and editors in general
 */
import { EditorState, ContentState } from "draft-js";

/**
 * Returns an EditorState with the text already typed out for you!
 */
const editorStateFromText = text =>
  EditorState.createWithContent(ContentState.createFromText(text));

export default { editorStateFromText };
