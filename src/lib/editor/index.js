import Editor from "./BaseEditor.js";
import { serializeContent, deSerializeContent } from "./EditorSerializer.js";
import { emptySerializedEditorState } from "./util";
import { NoteModel } from "../note";
const EDITOR_NAME = "BaseEditor";

const noteWithEmptyEditor = () => {
  return new NoteModel(emptySerializedEditorState(), EDITOR_NAME, [], []);
};

export {
  Editor,
  serializeContent,
  deSerializeContent,
  EDITOR_NAME,
  noteWithEmptyEditor
};
