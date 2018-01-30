import { noteArrayToDict, noteDictToArray, newNote } from "../util";
import NoteModel from "../Note";

test("noteArrayToDict preserves a collection of notes as NoteModel", () => {
  const notes = [newNote(), newNote(), newNote()];
  const dict = noteArrayToDict(notes);
  expect(dict[notes[0].uuid] instanceof NoteModel).toBe(true);
});

test("noteDictToArray correctly orders some notes", () => {
  const notes = [newNote(), newNote(), newNote()];
  const dict = noteArrayToDict(notes);
  const arr = noteDictToArray(dict);
  expect(arr[0].uuid === dict[arr[0].uuid].uuid).toBe(true);
  expect(arr[1].uuid === dict[arr[1].uuid].uuid).toBe(true);
  expect(arr[2].uuid === dict[arr[2].uuid].uuid).toBe(true);
});

test("newNote creates a new note model", () => {
  expect(newNote("foo") instanceof NoteModel).toBe(true);
});

test("newNote creates a note model even when empty", () => {
  expect(newNote() instanceof NoteModel).toBe(true);
});
