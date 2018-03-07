import {
  loadNotes as load,
  saveNote as save,
  deleteNote as deleteN
} from "../../lib/io";
import { firstNoteIfDefined } from "../utils";
/**
 * Action Name constants
 */
export const SET_SCREEN = "SET_SCREEN";
export const SET_PREFERENCES = "SET_PREFERENCES";
export const LOAD_NOTES = "LOAD_NOTES";
export const RECEIVED_NOTES = "RECEIVED_NOTES";
export const LOAD_NOTE_CONTENT = "LOAD_NOTE_CONTENT";
export const RECEIVED_NOTE_CONTENT = "RECEVED_NOTE_CONTENT";
export const SELECT_NOTE = "SELECT_NOTE";
export const SET_EDITOR_STATE = "SET_EDITOR_STATE";
export const SET_TOAST = "SET_TOAST";
export const UPDATE_NOTE = "UPDATE_NOTE";
export const DELETE_NOTE = "DELETE_NOTE";
export const SEARCH_NOTE = "SEARCH_NOTE";
export const SAVED_NOTE = "SAVED_NOTE";
export const MOVE_NOTE_TO_FRONT = "MOVE_NOTE_TO_FRONT";

/**
 * Other constants
 */
export const SCREENS = {
  MAIN: "MAIN",
  STORE: "STORE"
};

/**
 * Action Creators
 */
export function setScreen(screen) {
  return { type: SET_SCREEN, screen };
}

export function setToast(message, toastType = null) {
  return { type: SET_TOAST, message, toastType };
}

export function setPreferences(preferences) {
  return { type: SET_PREFERENCES, preferences };
}

function getNotes() {
  return { type: LOAD_NOTES };
}

function moveNoteToFront(note) {
  return { type: MOVE_NOTE_TO_FRONT, note };
}

function receivedNotes(notes) {
  return { type: RECEIVED_NOTES, notes };
}

export function selectNote(note) {
  return { type: SELECT_NOTE, note };
}

export function setQuery(query) {
  return { type: SEARCH_NOTE, query };
}

function getNoteContent(note) {
  return { type: LOAD_NOTE_CONTENT, note };
}

function receivedNoteContent(note, content) {
  return { type: RECEIVED_NOTE_CONTENT, content, note };
}

export function setEditorState(editorState) {
  return { type: SET_EDITOR_STATE, editorState };
}

export function updateNote(note) {
  return { type: UPDATE_NOTE, note };
}

export function loadNoteContent(note) {
  return dispatch => {
    dispatch(getNoteContent());
    return note.getContent().then(content => {
      dispatch(receivedNoteContent(note, content));
    });
  };
}

export function selectAndLoadNote(note) {
  return dispatch => {
    dispatch(selectNote(note));
    if (note !== null) {
      dispatch(loadNoteContent(note));
    }
  };
}

export function loadNotes() {
  return dispatch => {
    dispatch(getNotes());
    return load().then(notes => {
      dispatch(receivedNotes(notes));
      dispatch(selectAndLoadNote(firstNoteIfDefined(notes)));
    });
  };
}

function savedNote(note) {
  return { type: SAVED_NOTE, note };
}

export function updateAndSaveNote(note) {
  return dispatch => {
    dispatch(updateNote(note));
    save(note).then(() => {
      dispatch(savedNote(note));
    });
  };
}

export function saveThenUpdateNote(note) {
  return dispatch => {
    save(note).then(() => {
      dispatch(updateNote(note));
      dispatch(savedNote(note));
    });
  };
}

export function saveNote(note) {
  return dispatch => {
    save(note).then(() => {
      dispatch(savedNote(note));
    });
  };
}

export function newNote(note) {
  return dispatch => {
    save(note).then(() => {
      dispatch(updateNote(note));
      dispatch(savedNote(note));
      dispatch(moveNoteToFront(note));
    });
  };
}

export function deleteNote(note) {
  deleteN(note);
  return { type: DELETE_NOTE, note };
}
