/**
 * Adds a "text" version of the editor state to each note in the notes object
 */
const fromNotesToSearchableObjects = notes => {
  const ids = Object.keys(notes);
  return ids.map(id => {
    return {
      text: notes[id].editorState.getCurrentContent().getPlainText(),
      id: id
    };
  });
};

/**
   * Creates data that we can use for a Note
   * @param {EditorState} editorState
   */
const addNewNoteData = (notes, note) => {
  return notes.set(note.id, note);
};

const removeNoteData = (notes, id) => {
  return notes.delete(id);
};

/* Maps a list of valid ids to a dictionary of notes, selecting only a subset of all notes. */
const mapIdsToNotes = (ids, allNotes) => {
  const notes = {};
  ids.forEach(id => {
    notes[id] = allNotes[id];
  });
  return notes;
};

export {
  fromNotesToSearchableObjects,
  addNewNoteData,
  removeNoteData,
  mapIdsToNotes
};
