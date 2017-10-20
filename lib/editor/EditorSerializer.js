import { convertToRaw, convertFromRaw, EditorState } from "draft-js";

/**
 * Serializes "content" of this editor so it can be saved.
 */
function serializeContent(editorState) {
  return {
    contentState: convertToRaw(editorState.getCurrentContent())
  };
}

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

const EditorSerializer = {
  serialize: serializeContent,
  deSerialize: deSerializeContent
};

export default EditorSerializer;
