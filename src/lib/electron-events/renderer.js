import names from "./names";
import { ipcRenderer } from "electron";

/**
 * Listeners
 */
function onChangeScreen(then) {
  return ipcRenderer.on(names.CHANGE_SCREEN, then);
}
function onExportNotes(then) {
  return ipcRenderer.on(names.EXPORT_NOTES, then);
}
function onImportNotes(then) {
  return ipcRenderer.on(names.IMPORT_NOTES, then);
}

export default {
  onChangeScreen,
  onExportNotes,
  onImportNotes
};
