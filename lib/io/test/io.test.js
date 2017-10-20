import { NoteModel, Attribute } from "../../note";
import { EditorState, ContentState } from "draft-js";
import { BasicIO } from "../index.js";
import { EditorSerializer } from "../../editor";

const newNote = () => {
  return new NoteModel(
    EditorState.createWithContent(ContentState.createFromText("Some Text")),
    EditorSerializer,
    [new Attribute("title", "My note", true), new Attribute("class", "math")]
  );
};

test("Saving a note works", done => {
  function callback() {
    done();
  }
  const io = new BasicIO();
  const note = newNote();
  io.saveNote(note, callback);
});

test("Deleting a note works", done => {
  function callback() {
    done();
  }

  const io = new BasicIO();
  io.deleteNote(newNote(), callback);
});
