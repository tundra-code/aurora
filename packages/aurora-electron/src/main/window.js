const electron = require("electron");
const htmlDataUri = require("./html.js");

// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
global.mainWindow = undefined;

function createWindow(rendererFilepath) {
  // Create the browser window.
  global.mainWindow = new BrowserWindow({ width: 800, height: 600 });

  // and load the index.html of the app.
  global.mainWindow.loadURL(htmlDataUri(rendererFilepath));

  // Emitted when the window is closed.
  global.mainWindow.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    global.mainWindow = null;
  });
}

module.exports = createWindow;
