import { EditorState, ContentState } from "draft-js";

const contentFromText = text => {
  return EditorState.createWithContent(ContentState.createFromText(text));
};

export { contentFromText };
