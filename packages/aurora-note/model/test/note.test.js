import Note from "../Note.js";
import { EditorState } from "draft-js";
import { util } from "../../../aurora-editor";

describe("Note", () => {
  it("has an id, a date, and an editorState", () => {
    const note = new Note(EditorState.createEmpty());
    expect(note.id).toBeDefined();
    expect(note.date).toBeDefined();
    expect(note.editorState).toBeDefined();
  });

  it("can export something to JSON", () => {
    const note = new Note(EditorState.createEmpty());
    expect(note.toJSON()).toBeDefined();
  });

  it("can tell you when it's empty", () => {
    const note = new Note(EditorState.createEmpty());
    expect(note.isEmpty()).toBe(true);
  });

  it("won't tell you it's empty when it's not", () => {
    const note = new Note(util.editorStateFromText("I AM NOT EMPTY"));
    expect(note.isEmpty()).toBe(false);
  });
});
