import { NoteModel } from "../note";

export default class IO {
  constructor() {}

  /*
  Saves the specified note. Overwrites an existing note with matching id.
  note : NoteModel
  onSuccess() : function invoked if successfully saved.
  onFailure() : function invoked if failure to save.
   */
  saveNote(note, onSuccess, onFailure) {
    if (!(note instanceof NoteModel)) {
      throw new Error("Attempted to save something that is not a NoteModel.");
    }
    onSuccess();
  }

  /*
  Deletes the specified note.
  note : NoteModel
  onSuccess() : function invoked if successfully deleted.
  onFailure() : function invoked if failure to delete.
   */
  deleteNote(note, onSuccess, onFailure) {
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
  loadNotes(onLoad, onFailure) {}

  /*
  Loads user preferences.
  onLoad(preferences) : function invoked when preferences are loaded. Takes in the JSON preferences object.
  onFailure() : function invoked if loading preferences fails.
   */
  loadPreferences(onLoad, onFailure) {
    onLoad({});
  }

  /*
  Saves user preferences.
  preferences : JSON object of preferences
  onSuccess() : function invoked when preferences are saved.
  onFailure() : function invoked if loading preferences fails.
   */
  savePreferences(preferences, onSuccess, onFailure) {
    onSuccess();
  }
}
