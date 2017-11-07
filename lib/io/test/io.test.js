import { NoteModel } from "../../note";
import {
  saveNote,
  loadNotes,
  deleteNote,
  savePreferences,
  loadPreferences,
  updatePreferences
} from "../index.js";
import { createPreferencesIfNotExist, addMutationPreference } from "../IO.js";
import { noteExistsIn, preferences, newNote } from "./util.js";
import { exists } from "../util";
import path from "path";
import tmp from "tmp";
tmp.setGracefulCleanup();

// Removes a tmp object
const rm = tmpObj => {
  try {
    tmpObj.removeCallback();
  } catch (err) {}
};

// Creates a tmp preferences file path for you
const tmpPrefsFile = () => {
  const tmpDir = tmp.dirSync();
  const prefsFile = path.join(tmpDir.name, "preferences-2342jif.json");
  const removeTmpFiles = () => {
    rm(tmpDir);
  };

  return { name: prefsFile, removeTmpFiles: removeTmpFiles };
};

test("IO exists and is defined", () => {
  expect(NoteModel).toBeDefined();
});

test("Saving a note, query notes and content, then delete that note works", done => {
  const ourNote = newNote();
  function noteGone(notes) {
    expect(noteExistsIn(ourNote, notes)).toBe(false);
    done();
  }
  function deleteCallback() {
    loadNotes(noteGone);
  }
  function deleteN(content) {
    expect(content).toBeDefined();
    deleteNote(ourNote, deleteCallback);
  }
  function loadContent(notes) {
    expect(notes).toBeDefined();
    expect(noteExistsIn(ourNote, notes)).toBe(true);
    notes[0].getContent(deleteN);
  }
  function queryNotes() {
    loadNotes(loadContent);
  }
  saveNote(ourNote, queryNotes);
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
  const { name, removeTmpFiles } = tmpPrefsFile();

  // Save a silly existing prefernece
  await savePreferences({ foo: "foo", bestAnimal: "cat" }, name);

  // Update the preferences to make logical sense
  await updatePreferences({ bestAnimal: "doggos" }, name);

  // Check we actually changed something
  const prefs = await loadPreferences(name);
  expect(prefs.bestAnimal).toBe("doggos"); // clearly
  expect(prefs.foo).toBe("foo"); // unchanged

  removeTmpFiles();
});

test("createPreferencesIfNotExist will create a new file if there's not one", async () => {
  expect.assertions(2);
  const { name, removeTmpFiles } = tmpPrefsFile();

  expect(exists(name)).toBe(false);
  await createPreferencesIfNotExist({ foo: "foo" }, name);
  expect(exists(name)).toBeTruthy();

  removeTmpFiles();
});

test("addMutationPreference will create a new attribute in the preferences file", async () => {
  expect.assertions(1);
  const { name, removeTmpFiles } = tmpPrefsFile();

  // Create a base prefs file
  await savePreferences({ mutations: [{ name: "joe" }] }, name);

  // Add a new mutation
  await addMutationPreference("bar", name);

  // Load and check if we actually changed something
  const prefs = await loadPreferences(name);
  expect(prefs.mutations).toMatchObject([{ name: "joe" }, { name: "bar" }]);

  removeTmpFiles();
});

/**
 * Note: I'm explcitly not testing "updateMutations" or "installMutations" 
 * here because their functionality is tested inside of react-mutate. Also 
 * they both involve installing files which could dramatically slow down tests :(
 */
