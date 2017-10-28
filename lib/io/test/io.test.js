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

test("Can load notes and note content", done => {
  function contentLoaded(data) {
    expect(data).toBeDefined();
    done();
  }
  loadNotes(notes => {
    expect(notes).toBeDefined();
    notes[0].getContent(contentLoaded);
  });
});

test("Saving a note, query notes, then delete that note works", done => {
  const ourNote = newNote();
  function noteGone(notes) {
    expect(noteExistsIn(ourNote, notes)).toBe(false);
    done();
  }
  function deleteCallback() {
    loadNotes(noteGone);
  }
  function deleteN(notes) {
    expect(noteExistsIn(ourNote, notes)).toBe(true);
    deleteNote(ourNote, deleteCallback);
  }
  function queryNotes() {
    loadNotes(deleteN);
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
