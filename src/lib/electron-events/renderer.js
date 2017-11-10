import names from "./names";
import { ipcRenderer } from "electron";

/**
 * Senders
 */
function sendInstallMutation(name) {
  ipcRenderer.send(names.INSTALL_MUTATION, name);
}

/**
 * Listeners
 */
function onChangeScreen(then) {
  return ipcRenderer.on(names.CHANGE_SCREEN, then);
}

function onMutationInstalled(then) {
  return ipcRenderer.on(names.INSTALL_MUTATION_REPLY, then);
}

export default {
  onChangeScreen,
  onMutationInstalled,
  sendInstallMutation
};
