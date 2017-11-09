import names from "./names";
import { ipcRenderer } from "electron";

function onChangeScreen(then) {
  return ipcRenderer.on(names.CHANGE_SCREEN, then);
}

export default {
  onChangeScreen
};
