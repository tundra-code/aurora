const ipcMain = jest.genMockFunction();
ipcMain.on = jest.genMockFunction();
ipcMain.send = jest.genMockFunction();

const ipcRenderer = jest.genMockFunction();
ipcRenderer.on = jest.genMockFunction();
ipcRenderer.send = jest.genMockFunction();

module.exports = {
  require: jest.genMockFunction(),
  match: jest.genMockFunction(),
  app: jest.genMockFunction(),
  remote: jest.genMockFunction(),
  dialog: jest.genMockFunction(),
  ipcMain: ipcMain,
  ipcRenderer: ipcRenderer
};
