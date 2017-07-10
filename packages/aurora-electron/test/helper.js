import path from "path";
import { Application } from "spectron";

function getElectronPath() {
  let electronPath = path.join(
    __dirname,
    "..",
    "node_modules",
    ".bin",
    "electron"
  );
  if (process.platform === "win32") {
    electronPath += ".cmd";
  }
  return electronPath;
}

function startApplication(options) {
  options.path = getElectronPath();
  if (process.env.CI) {
    options.startTimeout = 30000;
  }

  const app = new Application(options);
  return app.start().then(() => {
    expect(app.isRunning()).toBe(true);
    return app;
  });
}

export { startApplication };
