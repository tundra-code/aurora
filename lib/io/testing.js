import { NoteModel, Attribute } from "../note";
import { EditorState, ContentState } from "draft-js";
import { saveNote } from "./index.js";
import { serializeContent } from "../editor";

const newNote = () => {
  const content = EditorState.createWithContent(
    ContentState.createFromText("Some Text")
  );
  return new NoteModel(serializeContent(content), "Aurora-Editor", [
    new Attribute("title", "My note", true),
    new Attribute("class", "math")
  ]);
};

function callback() {
  console.log("Added note");
}
const note = newNote();
saveNote(note, callback);
