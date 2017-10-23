import { NoteModel, Attribute } from "../../note";
import { EditorState, ContentState } from "draft-js";
import { saveNote, loadNotes, deleteNote } from "../index.js";
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

test("Loading notes works", done => {
  function callback() {
    done();
  }
  loadNotes(callback);
});

test("Saving a note works", done => {
  function callback() {
    done();
  }
  const note = newNote();
  saveNote(note, callback);
});

test("Deleting a note works", done => {
  function callback() {
    done();
  }

  deleteNote(newNote(), callback);
});
