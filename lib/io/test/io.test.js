import { NoteModel, Attribute } from "../../note";
import { EditorState, ContentState } from "draft-js";
import {
  saveNote,
  loadNotes,
  deleteNote,
  savePreferences,
  loadPreferences
} from "../index.js";
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

test("Saving a note works", done => {
  function callback() {
    done();
  }
  const note = newNote();
  saveNote(note, callback);
});

test("Loading notes works", done => {
  function callback() {
    done();
  }
  loadNotes(callback);
});

test("Deleting a note works", done => {
  function callback() {
    done();
  }
  deleteNote(newNote(), callback);
});

test("Can save preferences file", done => {
  function callback() {
    done();
  }
  savePreferences(preferences, callback);
});

test("Can load preferences file", done => {
  function callback(pref) {
    expect(pref).toMatchObject(preferences);
    done();
  }
  loadPreferences(callback);
});
