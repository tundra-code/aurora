import {
  pickPreviousNoteInList,
  removeNoteFromAllNotes,
  updateNoteInAllNotes,
  indexOfNoteInArray
} from "../index";
import { newNote, noteArrayToDict } from "../../../lib/note/util";
import NoteModel from "../../../lib/note/Note";

test("updateNoteInAllNotes doesn't change NoteModel types", () => {
  const notes = [newNote(), newNote(), newNote()];
  const dict = noteArrayToDict(notes);

  const newAllNotes = updateNoteInAllNotes(notes[0], dict);
  expect(newAllNotes[notes[0].uuid] instanceof NoteModel).toBe(true);
});

test("removeNoteFromAllNotes doesn't change NoteModel types", () => {
  const notes = [newNote(), newNote(), newNote()];
  const allNotes = noteArrayToDict(notes);

  const newAllNotes = removeNoteFromAllNotes(notes[0], allNotes);
  expect(newAllNotes[notes[1].uuid] instanceof NoteModel);
  expect(newAllNotes[notes[2].uuid] instanceof NoteModel);
});

test("pickNotesFromAllNotes preserves NoteModel type", () => {
  const notes = [newNote(), newNote(), newNote()];
  const allNotes = noteArrayToDict(notes);

  // Check First note is good
  const note = pickPreviousNoteInList(allNotes, notes[0]);
  expect(note instanceof NoteModel).toBe(true);

  // Remove that note and check again - 2nd note
  removeNoteFromAllNotes(note, allNotes);
  const note2 = pickPreviousNoteInList(allNotes, notes[0]);
  expect(note2 instanceof NoteModel);

  // Remove that note and check again - 3rd note
  removeNoteFromAllNotes(note, allNotes);
  const note3 = pickPreviousNoteInList(allNotes, notes[0]);
  expect(note3 instanceof NoteModel);
});

test("indexOfNoteInArray can find a note's index", () => {
  const notes = [newNote(), newNote()];
  expect(indexOfNoteInArray(notes, notes[0])).toBe(0);
  expect(indexOfNoteInArray(notes, notes[1])).toBe(1);
});

test("indexOfNoteInArray can return -1 if there's no note", () => {
  const notes = [newNote(), newNote()];
  expect(indexOfNoteInArray(notes, newNote())).toBe(-1);
});
