import { insertNote } from "./sqlite/insert.js";
import { queryNotes } from "./sqlite/query.js";
import { cascadeDeleteNote } from "./sqlite/delete.js";
import {
  auroraDirContext,
  saveToAsync,
  readFromAsync,
  throwIfNotNoteModel,
  exists
} from "./util.js";
import { auroraUserPath, auroraPreferencesFile } from "../paths";
import { installMutations } from "@react-mutate/loader";
import safeParseJSON from "json-parse-safe";

const preferencesFile = auroraPreferencesFile();

/*
  Saves the specified note. Overwrites an existing note with matching id.
  @param note : NoteModel
  @returns Promise
   */
function saveNote(note) {
  throwIfNotNoteModel(note);
  return insertNote(note);
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
    queryNotes(resolve, reject);
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
  Loads user preferences.
  @returns Promise
   */
async function loadPreferences(file = preferencesFile) {
  await createPreferencesIfNotExist({});

  return new Promise((resolve, reject) => {
    function load(pref) {
      const parsed = safeParseJSON(pref);
      if (parsed.error) {
        reject(parsed.error);
        return;
      }

      resolve(parsed.value);
    }
    readFromAsync(file, auroraDirContext(), load, reject);
  });
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

async function installMutationFiles(mutations) {
  return installMutations(mutations.map(mut => mut.name), auroraUserPath());
}

export {
  saveNote,
  loadNotes,
  deleteNote,
  loadPreferences,
  savePreferences,
  updatePreferences,
  createPreferencesIfNotExist,
  installMutationFiles
};
