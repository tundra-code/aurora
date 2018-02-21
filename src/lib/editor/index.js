import Editor from "./BaseEditor.js";
import {
  emptySerializedEditorState,
  emptyEditorState,
  serializeContent,
  deSerializeContent
} from "./util";
import { serializePreview } from "./Preview";
const EDITOR_NAME = "BaseEditor";

// const noteWithEmptyEditor = () => {
//   return new NoteModel(emptySerializedEditorState(), EDITOR_NAME, []);
// };

export {
  Editor,
  serializeContent,
  deSerializeContent,
  EDITOR_NAME,
  emptyEditorState,
  emptySerializedEditorState,
  serializePreview
};
