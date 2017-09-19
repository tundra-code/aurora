/**
 * A persistance model that does nothing, used for testing
 */

const fake = {
  save: () => {
    return Date.now().toString();
  },
  loadNotes: back => {
    back([]);
  },
  deleteNote: () => {}
};

export default fake;
