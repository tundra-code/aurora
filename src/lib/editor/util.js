/**
 * A collection of utilities for working with Draft-js and editors in general
 */
import {
  EditorState,
  ContentState,
  convertToRaw,
  convertFromRaw
} from "draft-js";
//import { serializeContent } from "./index";

/**
 * Serializes "content" of this editor so it can be saved.
 */
function serializeContent(editorState) {
  return {
    contentState: convertToRaw(editorState.getCurrentContent())
  };
}

/**
 * Returns an EditorState with the text already typed out for you!
 */
const editorStateFromText = text =>
  EditorState.createWithContent(ContentState.createFromText(text));

function emptyEditorState() {
  return EditorState.createEmpty();
}

const emptySerializedEditorState = () => {
  return serializeContent(emptyEditorState());
};

/**
 * Deserializes "content" of this editor so it can be loaded in.
 */
function deSerializeContent(content) {
  const contentState = convertFromRaw(content.contentState);
  let editorState = EditorState.createWithContent(contentState);
  // Note that the "moveSelectionToEnd" is required to fix errors
  // that put the cursor in the front instead of at the end when clicked on.
  editorState = EditorState.moveSelectionToEnd(
    EditorState.createWithContent(editorState.getCurrentContent())
  );
  return editorState;
}

window.editors = {
  BaseEditor: {
    emptyEditorState: emptyEditorState(),
    newNoteContent: emptySerializedEditorState()
  }
};

export {
  editorStateFromText,
  emptySerializedEditorState,
  emptyEditorState,
  serializeContent,
  deSerializeContent
};
