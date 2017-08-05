import { app } from "electron";
import windows from "./windows";

let mainWindow = null;

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("ready", () => {
  mainWindow = windows.createMain();
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
});

export default app;
