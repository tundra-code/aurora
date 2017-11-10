import names from "./names";
import { ipcMain } from "electron";

/**
 * Senders
 */
function sendScreenChange(window, screen) {
  window.webContents.send(names.CHANGE_SCREEN, screen);
}

function sendInstallMutationReply(event, arg) {
  event.sender.send(names.INSTALL_MUTATION_REPLY, arg);
}

/**
 * Listeners
 */
function onInstallMutation(then) {
  ipcMain.on(names.INSTALL_MUTATION, then);
}

export default {
  sendScreenChange,
  sendInstallMutationReply,
  onInstallMutation
};
