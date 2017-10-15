/**
 * Respond to events sent by the renderer
 */
const { ipcMain } = require("electron");
const { installAndLoadMutations } = require("./util.js");

/**
 * Call with a window to setup events for that window's renderer process
 */
function setupEvents(window) {
  ipcMain.on("install-mutations", () => {
    const mutations = installAndLoadMutations();
    window.webContents.send("mutations-loaded", mutations);
  });
}

module.exports = setupEvents;
