import { NoteModel } from "../note";
import { insertNote } from "./sqlite/insert.js";
import { queryNotes } from "./sqlite/query.js";
import { getAuroraDirContext, saveTo, readFrom, deleteFile } from "./util.js";

const preferencesFile = "aurora-preferences.json";
/*
  Saves the specified note. Overwrites an existing note with matching id.
  note : NoteModel
  onSuccess() : function invoked if successfully saved.
  onFailure() : function invoked if failure to save.
   */
function saveNote(note, onSuccess, onFailure) {
  if (!(note instanceof NoteModel)) {
    throw new Error("Attempted to save something that is not a NoteModel.");
  }
  insertNote(note, onSuccess);
}

/*
  Deletes the specified note.
  note : NoteModel
  onSuccess() : function invoked if successfully deleted.
  onFailure() : function invoked if failure to delete.
   */
function deleteNote(note, onSuccess, onFailure) {
  if (!(note instanceof NoteModel)) {
    throw new Error("Attempted to save something that is not a NoteModel.");
  }
  onSuccess();
}

/*
  Loads all notes.
  note : NoteModel
  onLoad(note) : function invoked when a note is loaded. Takes in a note as a parameter.
  onFailure(note) : function invoked if loading a specific note fails. Takes in the note as a parameter.
   */
function loadNotes(onLoad, onFailure) {
  queryNotes(onLoad);
}

/*
  Loads user preferences.
  onLoad(preferences) : function invoked when preferences are loaded. Takes in the JSON preferences object.
  onFailure() : function invoked if loading preferences fails.
   */
function loadPreferences(onLoad, onFailure) {
  const preferences = readFrom(preferencesFile, getAuroraDirContext());
  onLoad(JSON.parse(preferences));
}

/*
  Saves user preferences.
  preferences : JSON object of preferences
  onSuccess() : function invoked when preferences are saved.
  onFailure() : function invoked if loading preferences fails.
   */
function savePreferences(preferences, onSuccess, onFailure) {
  saveTo(preferences, preferencesFile, getAuroraDirContext());
  onSuccess();
}

export { saveNote, loadNotes, deleteNote, loadPreferences, savePreferences };
