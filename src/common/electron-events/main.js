import names from "./names";

/**
 * Senders
 */
function sendScreenChange(window, screen) {
  window.webContents.send(names.CHANGE_SCREEN, screen);
}

export default {
  sendScreenChange
};
