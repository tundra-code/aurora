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
  SET_EDITOR_STATE,
  UPDATE_NOTE,
  DELETE_NOTE,
  SEARCH_NOTE,
  SAVED_NOTE
} from "../actions";
import {
  updateNoteInAllNotes,
  removeNoteFromAllNotes,
  emptyEditorState
} from "../utils";
import { noteArrayToDict } from "../../lib/note/util";

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
    isLoadingContent: false,
    query: "",
    unsavedChanges: false
  },
  action
) {
  switch (action.type) {
    case LOAD_NOTES:
      return Object.assign({}, state, {
        isLoadingNotes: true
      });
    case SAVED_NOTE:
      return Object.assign({}, state, {
        unsavedChanges: false
      });
    case RECEIVED_NOTES:
      return Object.assign({}, state, {
        isLoadingNotes: false,
        allNotes: noteArrayToDict(action.notes)
      });
    case SELECT_NOTE:
      if (action.note === state.selectedNote) {
        return state;
      }
      return Object.assign({}, state, {
        selectedNote: action.note,
        editorState: emptyEditorState()
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
    case UPDATE_NOTE:
      if (action.note.uuid === state.selectedNote.uuid) {
        return Object.assign({}, state, {
          allNotes: updateNoteInAllNotes(action.note, state.allNotes),
          selectedNote: Object.assign({}, action.note), // copy to force props to update
          unsavedChanges: true
        });
      }
      return Object.assign({}, state, {
        allNotes: updateNoteInAllNotes(action.note, state.allNotes),
        unsavedChanges: true
      });
    case DELETE_NOTE:
      return Object.assign({}, state, {
        allNotes: removeNoteFromAllNotes(action.note, state.allNotes)
      });
    case SEARCH_NOTE:
      return Object.assign({}, state, {
        query: action.query
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
