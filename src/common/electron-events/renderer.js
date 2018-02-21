import names from "./names";
import { ipcRenderer } from "electron";

/**
 * Listeners
 */
function onChangeScreen(then) {
  return ipcRenderer.on(names.CHANGE_SCREEN, then);
}

export default {
  onChangeScreen
};
