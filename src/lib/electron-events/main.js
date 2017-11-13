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

function sendPreferences(event, preferences) {
  event.sender.send(names.RETURN_GET_PREFERENCES, preferences);
}

/**
 * Listeners
 */
function onInstallMutation(then) {
  ipcMain.on(names.INSTALL_MUTATION, then);
}

function onGetPreferences(then) {
  ipcMain.on(names.GET_PREFERENCES, then);
}

export default {
  sendScreenChange,
  sendInstallMutationReply,
  onInstallMutation,
  onGetPreferences,
  sendPreferences
};
