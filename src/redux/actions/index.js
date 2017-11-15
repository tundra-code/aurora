import { loadNotes as load } from "../../lib/io";
import { firstNoteIfDefined } from "../utils";
import { EDITOR_NAME, deSerializeContent } from "../../lib/editor";
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

function receivedNotes(notes) {
  return { type: RECEIVED_NOTES, notes };
}

export function selectNote(note) {
  return { type: SELECT_NOTE, note };
}

export function loadNotes() {
  return dispatch => {
    dispatch(getNotes());
    return load().then(notes => {
      dispatch(receivedNotes(notes));
      dispatch(selectNote(firstNoteIfDefined(notes)));
    });
  };
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

export function loadNoteContent(note) {
  return dispatch => {
    dispatch(getNoteContent());
    return note.getContent().then(content => {
      const editorState = deSerializeContent(content[EDITOR_NAME]);
      dispatch(receivedNoteContent(note, content));
      dispatch(setEditorState(editorState));
    });
  };
}
