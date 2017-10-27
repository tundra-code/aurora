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

test("Can load notes", done => {
  loadNotes(notes => {
    expect(notes).toBeDefined();
    done();
  });
});

test("Saving a note, query notes, then delete that note works", done => {
  const ourNote = newNote();
  function noteGone(notes) {
    done();
  }
  function deleteCallback() {
    loadNotes(noteGone);
  }
  function deleteN(notes) {
    expect(noteExistsIn(ourNote, notes)).toBe(false);
    deleteNote(ourNote, deleteCallback);
  }
  function queryNotes() {
    loadNotes(deleteN);
  }
  saveNote(ourNote, queryNotes);
});

test("Can save preferences file", done => {
  savePreferences(preferences, () => {
    done();
  });
});

test("Can load preferences file", done => {
  loadPreferences(pref => {
    expect(pref).toMatchObject(preferences);
    done();
  });
});
