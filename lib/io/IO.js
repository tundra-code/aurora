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

const preferencesFile = "aurora-preferences.json";
/*
  Saves the specified note. Overwrites an existing note with matching id.
  note : NoteModel
  onSuccess() : function invoked if successfully saved.
  onFailure(err) : function invoked if failure to save. Takes in error object.
   */
function saveNote(note, onSuccess, onFailure) {
  throwIfNotNoteModel(note);
  insertNote(note, onSuccess, onFailure);
}

/*
  Deletes the specified note.
  note : NoteModel
  onSuccess() : function invoked if successfully deleted.
  onFailure(err) : function invoked if failure to delete. Takes in error object.
   */
function deleteNote(note, onSuccess, onFailure) {
  throwIfNotNoteModel(note);
  cascadeDeleteNote(note, onSuccess, onFailure);
}

/*
  Loads all notes.
  note : NoteModel
  onLoad(note) : function invoked all notes are loaded. Should take in array of note objects as parameter.
  onFailure(err) : function invoked if loading fails. Takes in error object.
   */
function loadNotes(onLoad, onFailure) {
  queryNotes(onLoad, onFailure);
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
  if (!exists(file)) {
    await savePreferences(preferences);
    return;
  }

  const oldPrefs = await loadPreferences(file);
  const newPrefs = Object.assign({}, oldPrefs, preferences);
  return savePreferences(newPrefs, file);
}

export {
  saveNote,
  loadNotes,
  deleteNote,
  loadPreferences,
  savePreferences,
  updatePreferences
};
