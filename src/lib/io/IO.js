import { insertNote } from "./sqlite/insert.js";
import { queryNotes } from "./sqlite/query.js";
import { cascadeDeleteNote } from "./sqlite/delete.js";
import {
  auroraDirContext,
  saveToAsync,
  readFromAsync,
  throwIfNotNoteModel,
  exists,
  auroraRootPath
} from "./util.js";
import { installMutations } from "@react-mutate/loader";

const preferencesFile = "aurora-preferences.json";
/*
  Saves the specified note. Overwrites an existing note with matching id.
  @param note : NoteModel
  @returns Promise
   */
function saveNote(note) {
  throwIfNotNoteModel(note);
  return new Promise((resolve, reject) => {
    insertNote(note, resolve, reject);
  });
}

/*
  Deletes the specified note.
  @param note : NoteModel
  @returns Promise
   */
function deleteNote(note) {
  throwIfNotNoteModel(note);
  return new Promise((resolve, reject) => {
    cascadeDeleteNote(note, resolve, reject);
  });
}

/*
  Loads all notes ordered by most recently updated to least recently.
  @returns Promise
   */
function loadNotes() {
  return new Promise((resolve, reject) => {
    function load(notes) {
      resolve(notes);
    }
    queryNotes(load, reject);
  });
}

/**
  Loads user preferences.
  @returns Promise
   */
function loadPreferences(file = preferencesFile) {
  return new Promise((resolve, reject) => {
    function load(pref) {
      resolve(JSON.parse(pref));
    }
    readFromAsync(file, auroraDirContext(), load, reject);
  });
}

/**
  Saves user preferences.
  @param preferences is a JSON object of preferences
  @returns Promise
   */
function savePreferences(preferences, file = preferencesFile) {
  return new Promise((resolve, reject) => {
    saveToAsync(preferences, file, auroraDirContext(), resolve, reject);
  });
}

/**
 * Creates a preferences file if one doesn't already exist.
 * Otherwise does nothing.
 */
async function createPreferencesIfNotExist(
  preferences,
  file = preferencesFile
) {
  if (!exists(file)) {
    await savePreferences(preferences, file);
  }
}

/**
 * Updates user preferences with new changes. Creates a new file if needed.
 * @example
 * // Current preferences look like this
 * {
 *   foo: "bar",
 *   pro: "grammer"
 * }
 *
 * // Change "foo", leave "pro" alone
 * updatePreferences({
 *  foo: "notBar"
 * });
 *
 * // Now preferences looks like this:
 * {
 *   foo: "notBar",
 *   pro: "grammer"
 * }
 *
 * @param preferences a subset of or addition to existing preferences
 * @return Promise
 */
async function updatePreferences(preferences, file = preferencesFile) {
  await createPreferencesIfNotExist(preferences, file);

  const oldPrefs = await loadPreferences(file);
  const newPrefs = Object.assign({}, oldPrefs, preferences);
  return savePreferences(newPrefs, file);
}

/**
 * Updates mutations based on preferences file
 */
async function updateMutations(prefsFile = preferencesFile) {
  await createPreferencesIfNotExist({}, prefsFile);
  const prefsJSON = await loadPreferences(prefsFile);
  const mutations = prefsJSON.mutations || [];

  return installMutations(mutations.map(mut => mut.name), auroraRootPath());
}

/**
 * Adds a new mutation to the preference file.
 * @param {String} name
 */
async function addMutationPreference(name, prefsFile = preferencesFile) {
  await createPreferencesIfNotExist({}, prefsFile);
  const prefsJSON = await loadPreferences(prefsFile);

  // Add to mutations or create new field in preferences
  const mutations = prefsJSON.mutations || [];
  mutations.push({ name });
  prefsJSON.mutations = mutations;

  return savePreferences(prefsJSON, prefsFile);
}

/**
 * Installs a new mutation.
 * @param {String} name
 */
async function installNewMutation(name, prefsFile = preferencesFile) {
  await addMutationPreference(name, prefsFile);
  return updateMutations(prefsFile);
}

export {
  saveNote,
  loadNotes,
  deleteNote,
  loadPreferences,
  savePreferences,
  updatePreferences,
  installNewMutation,
  createPreferencesIfNotExist,
  updateMutations,
  addMutationPreference
};
