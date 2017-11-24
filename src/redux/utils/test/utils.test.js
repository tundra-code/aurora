import {
  notesToDict,
  pickNoteFromAllNotes,
  removeNoteFromAllNotes,
  updateNoteInAllNotes
} from "../index";
import { NoteModel } from "../../../lib/note";
import { ContentState, EditorState } from "draft-js";
import { serializeContent } from "../../../lib/editor/EditorSerializer";

const newNote = () =>
  new NoteModel(
    serializeContent(
      EditorState.createWithContent(ContentState.createFromText("Hello"))
    ),
    "BaseEditor",
    [],
    [],
    []
  );

test("notesToDict preserves a collection of notes as NoteModel", () => {
  const notes = [newNote(), newNote(), newNote()];
  const dict = notesToDict(notes);
  expect(dict[notes[0].uuid] instanceof NoteModel).toBe(true);
});

test("updateNoteInAllNotes doesn't change NoteModel types", () => {
  const notes = [newNote(), newNote(), newNote()];
  const dict = notesToDict(notes);
  const newAllNotes = updateNoteInAllNotes(notes[0], dict);
  expect(newAllNotes[notes[0].uuid] instanceof NoteModel).toBe(true);
});

test("removeNoteFromAllNotes doesn't change NoteModel types", () => {
  const notes = [newNote(), newNote(), newNote()];
  const allNotes = notesToDict(notes);

  const newAllNotes = removeNoteFromAllNotes(notes[0], allNotes);
  expect(newAllNotes[notes[1].uuid] instanceof NoteModel);
  expect(newAllNotes[notes[2].uuid] instanceof NoteModel);
});

test("pickNotesFromAllNotes preserves NoteModel type", () => {
  const notes = [newNote(), newNote(), newNote()];
  const allNotes = notesToDict(notes);

  // Check First note is good
  const note = pickNoteFromAllNotes(allNotes);
  expect(note instanceof NoteModel).toBe(true);

  // Remove that note and check again - 2nd note
  removeNoteFromAllNotes(note, allNotes);
  const note2 = pickNoteFromAllNotes(allNotes);
  expect(note2 instanceof NoteModel);

  // Remove that note and check again - 3rd note
  removeNoteFromAllNotes(note, allNotes);
  const note3 = pickNoteFromAllNotes(allNotes);
  expect(note3 instanceof NoteModel);
});
