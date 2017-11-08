import {
  saveNote,
  loadNotes,
  deleteNote,
  savePreferences,
  loadPreferences,
  updatePreferences
} from "../index.js";
import { noteExistsIn, preferences, newNote } from "./util.js";
import { loadDB } from "../sqlite/setup.js";
import path from "path";
import tmp from "tmp";
tmp.setGracefulCleanup();

// Removes a tmp object
const rm = tmpObj => {
  try {
    tmpObj.removeCallback();
  } catch (err) {}
};

test("IO exists and is defined", () => {
  expect(saveNote).toBeDefined();
});

test("Can load the database", done => {
  loadDB().then(() => {
    done();
  });
});

test("Saving a note, query notes and content, then delete that note works", async () => {
  const ourNote = newNote();

  // Save the note and verify it can be loaded.
  await saveNote(ourNote);
  const notes = await loadNotes();
  expect(notes).toBeDefined();
  expect(noteExistsIn(ourNote, notes)).toBe(true);

  // Try loading note's content from a file
  const content = await notes[0].getContent();
  expect(content).toBeDefined();

  // Try deleting the note and making sure it is no longer in the db.
  await deleteNote(ourNote);
  const notes2 = await loadNotes();
  expect(noteExistsIn(ourNote, notes2)).toBe(false);
});

test("Can save and then load preferences file", async () => {
  expect.assertions(1);
  const tmpDir = tmp.dirSync();

  // Save some preferences
  await savePreferences(
    preferences,
    path.join(tmpDir.name, "preferences.json")
  );

  // Load them in again
  const prefs = await loadPreferences(
    path.join(tmpDir.name, "preferences.json")
  );

  // Clean up because we're nice
  rm(tmpDir);

  // Check that we did well
  expect(prefs).toMatchObject(preferences);
});

test("updatePreferences doesn't fail if there's no file", async () => {
  expect.assertions(1);
  const tmpDir = tmp.dirSync();

  // Update preferences for a file that doesn't exist
  await updatePreferences(
    { blah: "blah " },
    path.join(tmpDir.name, "i-dont-exist-123jiojfe.json")
  );

  // Clean up because we're nice
  rm(tmpDir);

  // if we got here then we pass
  expect(true).toBe(true);
});

test("updatePreferences can update existing preferences files", async () => {
  expect.assertions(2);
  const tmpDir = tmp.dirSync();
  const prefsFile = path.join(tmpDir.name, "preferences-2342jif.json");

  // Save a silly existing prefernece
  await savePreferences({ foo: "foo", bestAnimal: "cat" }, prefsFile);

  // Update the preferences to make logical sense
  await updatePreferences({ bestAnimal: "doggos" }, prefsFile);

  // Check we actually changed something
  const prefs = await loadPreferences(prefsFile);
  expect(prefs.bestAnimal).toBe("doggos"); // clearly
  expect(prefs.foo).toBe("foo"); // unchanged
});
