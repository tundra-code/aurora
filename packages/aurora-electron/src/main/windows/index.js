import { BrowserWindow } from "electron";
import path from "path";
import url from "url";

const WIDTH = 800;
const HEIGHT = 600;

const indexPath = url.format({
  pathname: path.join(__dirname, "index.html"),
  protocol: "file:"
});

/**
 * Creates a main window 
 * @return {BrowserWindow}
 */
function createMain() {
  const mainWindow = new BrowserWindow({ width: WIDTH, height: HEIGHT });
  mainWindow.loadURL(indexPath);
  return mainWindow;
}

export default {
  createMain
};
