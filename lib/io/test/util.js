import { NoteModel, Attribute } from "../../note";
import { EditorState, ContentState } from "draft-js";
import { serializeContent } from "../../editor";

const newNote = () => {
  const content = EditorState.createWithContent(
    ContentState.createFromText("Some Text")
  );
  return new NoteModel(serializeContent(content), "Aurora-Editor", [
    new Attribute("title", "My note", true),
    new Attribute("class", "math")
  ]);
};

const preferences = {
  username: "Bob",
  lastNote: 2,
  color: "red"
};

function noteExistsIn(note, notes) {
  for (let i = 0; i < notes.length; i++) {
    if (notes[i].uuid === note.uuid) {
      return true;
    }
  }
  return false;
}

export { noteExistsIn, preferences, newNote };
