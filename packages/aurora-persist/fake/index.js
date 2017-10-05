/**
 * A persistance model that does nothing, used for testing
 */

const fake = {
  save: () => {
    return Date.now().toString();
  },
  loadNotes: () => {},
  deleteNote: () => {}
};

export default fake;
