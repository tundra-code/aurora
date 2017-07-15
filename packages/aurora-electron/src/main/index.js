import { app, BrowserWindow } from "electron";
import path from "path";
import url from "url";

let mainWindow = null;

const indexPath = url.format({
  pathname: path.join(__dirname, "index.html"),
  protocol: "file:",
  slashes: true
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("ready", () => {
  mainWindow = new BrowserWindow({ width: 800, height: 600 });
  mainWindow.loadURL(indexPath);
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
});
