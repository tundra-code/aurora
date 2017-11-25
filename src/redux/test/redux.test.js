import configureStore from "../configureStore";
import { noteArrayToDict, newNote } from "../../lib/note/util";
import { deleteNote } from "../actions";

const selectedNote = newNote();
const noteArr = [selectedNote, newNote(), newNote()];
const store = configureStore({
  notes: {
    allNotes: noteArrayToDict(noteArr),
    selectedNote: selectedNote
  }
});

test("deleting a note will change the selectedNote to the next note", () => {
  store.dispatch(deleteNote(selectedNote));
  expect(store.getState().notes.selectedNote.uuid === noteArr[1].uuid).toBe(
    true
  );
});
