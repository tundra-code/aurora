import Editor from "./BaseEditor.js";
import {
  emptySerializedEditorState,
  emptyEditorState,
  serializeContent,
  deSerializeContent,
  getSearchableText
} from "./util";
import { serializePreview } from "./Preview";
const EDITOR_NAME = "BaseEditor";

export {
  Editor,
  serializeContent,
  deSerializeContent,
  EDITOR_NAME,
  emptyEditorState,
  emptySerializedEditorState,
  serializePreview,
  getSearchableText
};
