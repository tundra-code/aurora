import {
  getAuroraDirContext,
  attachMetaData,
  noteFileName,
  noteFileExt
} from "../util.js";
import fs from "fs";
import { EditorState } from "draft-js";

test("noteFileExt is actually an extension", () => {
  expect(noteFileExt.charAt(0)).toBe(".");
});

test("getAuroraDirContext generates a real location", () => {
  const dir = getAuroraDirContext().cwd();
  expect(fs.existsSync(dir)).toBe(true);
});

test("attachMetaData gives an object with multiple keys", () => {
  const data = attachMetaData(EditorState.createEmpty());
  expect(Object.keys(data).length).toBeGreaterThan(1);
});

test("noteFileName ends with our file extension", () => {
  const note = attachMetaData(EditorState.createEmpty());
  const noteFile = noteFileName(note);
  expect("." + noteFile.split(".")[1]).toBe(noteFileExt);
});
