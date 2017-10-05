import { save, deleteNote, loadNotes } from "../../aurora-file-io";

/**
 * A persistance model that uses the filesystem
 */

/**
 * The functions we use to persist state (ie: saving, deleting, loading to a file).
 * These ones are using the file system, but they could use something else too as long as 
 * they return the same stuff.
 */
const io = {
  save,
  deleteNote,
  loadNotes
};

export default io;
