/**
 * Why selectors?
 * These basically act as getters so we avoid weird issues
 * where reducers change the path to something without us realizing it.
 *
 * If "state.app.screen" changes, it can break lots of places all at once
 */

// app
const app = state => state.app;
export const screen = state => app(state).screen;
export const toast = state => app(state).toast;
export const preferences = state => app(state).preferences;

// notes
const notes = state => state.notes;
export const isLoadingNotes = state => notes(state).isLoadingNotes;
export const allNotes = state => notes(state).allNotes;
export const selectedNote = state => notes(state).selectedNote;
export const isLoadingContent = state => notes(state).isLoadingContent;
export const editorState = state => notes(state).editorState;
