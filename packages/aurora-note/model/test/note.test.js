import Note from "../Note.js";
import { EditorState } from "draft-js";

describe("Note", () => {
  it("has an id, a date, and an editorState", () => {
    const note = new Note(EditorState.createEmpty());
    expect(note.id).toBeDefined();
    expect(note.date).toBeDefined();
    expect(note.editorState).toBeDefined();
    expect(note.contentState).toBeDefined();
  });

  it("can export something to JSON", () => {
    const note = new Note(EditorState.createEmpty());
    expect(note.toJSON()).toBeDefined();
  });
});
