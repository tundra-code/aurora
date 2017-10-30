import { NoteModel, Attribute } from "../note";
import { EditorState, ContentState } from "draft-js";
import { saveNote, loadNotes } from "./index.js";
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

function notesLoaded(notes) {
  notes.forEach(note => {
    console.log(note);
  });
}

function callback() {
  console.log("Added note");
  loadNotes(notesLoaded);
}
const note = newNote();
saveNote(note, callback);
