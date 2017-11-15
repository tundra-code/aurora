import { combineReducers } from "redux";
import {
  SET_SCREEN,
  SET_PREFERENCES,
  LOAD_NOTES,
  RECEIVED_NOTES,
  LOAD_NOTE_CONTENT,
  RECEIVED_NOTE_CONTENT,
  SELECT_NOTE,
  SET_TOAST,
  SET_EDITOR_STATE
} from "../actions";
import { notesToDict, emptyEditorState } from "../utils";

function app(state = {}, action) {
  switch (action.type) {
    case SET_SCREEN:
      return Object.assign({}, state, {
        screen: action.screen
      });
    case SET_TOAST:
      return Object.assign({}, state, {
        toast: { message: action.message, type: action.toastType }
      });
    case SET_PREFERENCES:
      return Object.assign({}, state, {
        preferences: action.preferences
      });
    default:
      return state;
  }
}

function notes(
  state = {
    isLoadingNotes: false,
    allNotes: {},
    selectedNote: null,
    editorState: emptyEditorState(),
    isLoadingContent: false
  },
  action
) {
  switch (action.type) {
    case LOAD_NOTES:
      return Object.assign({}, state, {
        isLoadingNotes: true
      });
    case RECEIVED_NOTES:
      return Object.assign({}, state, {
        isLoadingNotes: false,
        allNotes: notesToDict(action.notes)
      });
    case SELECT_NOTE:
      return Object.assign({}, state, {
        selectedNote: action.note
      });
    case LOAD_NOTE_CONTENT:
      return Object.assign({}, state, {
        isLoadingContent: true
      });
    case RECEIVED_NOTE_CONTENT:
      return Object.assign({}, state, {
        isLoadingContent: false
      });
    case SET_EDITOR_STATE:
      return Object.assign({}, state, {
        editorState: action.editorState
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  app,
  notes
});

export default rootReducer;
