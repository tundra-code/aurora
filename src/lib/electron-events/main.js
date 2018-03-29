import names from "./names";

/**
 * Senders
 */
function sendScreenChange(window, screen) {
  window.webContents.send(names.CHANGE_SCREEN, screen);
}

function sendExportNotes(window, filePath) {
  window.webContents.send(names.EXPORT_NOTES, filePath);
}

function sendImportNotes(window, filePath) {
  window.webContents.send(names.IMPORT_NOTES, filePath);
}

export default {
  sendScreenChange,
  sendExportNotes,
  sendImportNotes
};
