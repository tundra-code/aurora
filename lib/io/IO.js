import { NoteModel } from "../note";
import { insertNote } from "./sqlite/insert.js";
import { queryNotes } from "./sqlite/query.js";
import { cascadeDeleteNote } from "./sqlite/delete.js";
import { auroraDirContext, saveToAsync, readFromAsync } from "./util.js";

const preferencesFile = "aurora-preferences.json";
/*
  Saves the specified note. Overwrites an existing note with matching id.
  note : NoteModel
  onSuccess() : function invoked if successfully saved.
  onFailure(err) : function invoked if failure to save. Takes in error object.
   */
function saveNote(note, onSuccess, onFailure) {
  if (!(note instanceof NoteModel)) {
    throw new Error("Attempted to save something that is not a NoteModel.");
  }
  insertNote(note, onSuccess, onFailure);
}

/*
  Deletes the specified note.
  note : NoteModel
  onSuccess() : function invoked if successfully deleted.
  onFailure(err) : function invoked if failure to delete. Takes in error object.
   */
function deleteNote(note, onSuccess, onFailure) {
  if (!(note instanceof NoteModel)) {
    throw new Error("Attempted to save something that is not a NoteModel.");
  }
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

/*
  Loads user preferences.
  onLoad(preferences) : function invoked when preferences are loaded. Takes in the JSON preferences object.
  onFailure(err) : function invoked if loading preferences fails. Takes in error object.
   */
function loadPreferences(onLoad, onFailure) {
  function load(pref) {
    onLoad(JSON.parse(pref));
  }
  readFromAsync(preferencesFile, auroraDirContext(), load, onFailure);
}

/*
  Saves user preferences.
  preferences : JSON object of preferences
  onSuccess(pref) : function invoked when preferences are saved. Takes in preferneces object.
  onFailure(err) : function invoked if loading preferences fails. Takes in error object.
   */
function savePreferences(preferences, onSuccess, onFailure) {
  saveToAsync(
    preferences,
    preferencesFile,
    auroraDirContext(),
    onSuccess,
    onFailure
  );
}

export { saveNote, loadNotes, deleteNote, loadPreferences, savePreferences };
