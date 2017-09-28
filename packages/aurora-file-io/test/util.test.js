import {
  getAuroraDirContext,
  noteFileName,
  noteFileExt,
  saveTo,
  deleteNoteFrom
} from "../util.js";
import fs from "fs";
import tmp from "tmp";
import jetpack from "fs-jetpack";
import { EditorState, ContentState } from "draft-js";
import { NoteModel } from "../../aurora-note";

const getTmpDirContext = () => {
  const tmpDirObj = tmp.dirSync({ prefix: "what-" });
  const context = jetpack.dir(tmpDirObj.name);
  return context;
};

const newNote = () => {
  return new NoteModel(
    EditorState.createWithContent(ContentState.createFromText("Some Text"))
  );
};

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

test("saveTo actually creates a note", async () => {
  // Create a temporary place for us to make a note.
  const tmpDirContext = getTmpDirContext();

  // Do a sanity check and make sure we don't currently have anthing in our tmp dir
  expect(tmpDirContext.list(".").length).toBe(0);

  // Create and save a dummy note
  const note = newNote();
  await saveTo(note, tmpDirContext);

  // Now expect there to be something inside of our tmpDir
  expect(tmpDirContext.list(".").length).toBe(1);

  tmpDirContext.remove();
});

test("deleteFrom actually deletes a note", async () => {
  // Create a tmp location
  const tmpDirContext = getTmpDirContext();

  // Do a sanity check and make sure we don't currently have anthing in our tmp dir
  expect(tmpDirContext.list(".").length).toBe(0);

  // Create and save two notes and lets only delete one.
  const note = newNote();
  await saveTo(note, tmpDirContext);

  // Check that we have two at the moment.
  expect(tmpDirContext.list(".").length).toBe(1);

  // Now let's just delete one and we deleted it
  await deleteNoteFrom(note.id, tmpDirContext);
  expect(tmpDirContext.list(".").length).toBe(0);

  // And clean up after ourselves
  tmpDirContext.remove();
});
