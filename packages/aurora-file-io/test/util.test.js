import { getAuroraDirContext, noteFileName, noteFileExt } from "../util.js";
import fs from "fs";
import { EditorState } from "draft-js";
import { NoteModel } from "../../aurora-note";

test("noteFileExt is actually an extension", () => {
  expect(noteFileExt.charAt(0)).toBe(".");
});

test("getAuroraDirContext generates a real location", () => {
  const dir = getAuroraDirContext().cwd();
  expect(fs.existsSync(dir)).toBe(true);
});

test("noteFileName ends with our file extension", () => {
  const note = new NoteModel(EditorState.createEmpty());
  const noteFile = noteFileName(note);
  expect("." + noteFile.split(".")[1]).toBe(noteFileExt);
});
