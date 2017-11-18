import Editor from "./BaseEditor.js";
import { serializeContent, deSerializeContent } from "./EditorSerializer.js";
import { noteWithEmptyEditor } from "./util";
const EDITOR_NAME = "BaseEditor";

export {
  Editor,
  serializeContent,
  deSerializeContent,
  EDITOR_NAME,
  noteWithEmptyEditor
};
