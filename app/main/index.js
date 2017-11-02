const { app } = require("electron");
const createWindow = require("./window.js");
const isDev = require('isdev');
const initMenu = require("./menu");

// Launc dev tools if we have ydev tools
if (isDev) {
  require('electron-debug')({showDevTools: true});
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  initMenu();
  createWindow("index.html");
});

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (global.mainWindow === null) {
    createWindow("index.html");
  }
});
