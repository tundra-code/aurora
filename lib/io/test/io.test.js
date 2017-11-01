import { NoteModel } from "../../note";
import {
  saveNote,
  loadNotes,
  deleteNote,
  savePreferences,
  loadPreferences
} from "../index.js";
import { noteExistsIn, preferences, newNote } from "./util.js";

test("IO exists and is defined", () => {
  expect(NoteModel).toBeDefined();
});

test("Saving a note, query notes and content, then delete that note works", done => {
  const ourNote = newNote();
  function noteGone(notes) {
    expect(noteExistsIn(ourNote, notes)).toBe(false);
    done();
  }
  function deleteCallback() {
    loadNotes(noteGone);
  }
  function deleteN(content) {
    expect(content).toBeDefined();
    deleteNote(ourNote, deleteCallback);
  }
  function loadContent(notes) {
    expect(notes).toBeDefined();
    expect(noteExistsIn(ourNote, notes)).toBe(true);
    notes[0].getContent(deleteN);
  }
  function queryNotes() {
    loadNotes(loadContent);
  }
  saveNote(ourNote, queryNotes);
});

test("Can save and then load preferences file", done => {
  savePreferences(preferences, () => {
    loadPreferences(pref => {
      expect(pref).toMatchObject(preferences);
      done();
    });
  });
});
