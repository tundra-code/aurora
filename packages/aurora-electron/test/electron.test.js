import { Application } from "spectron";
import { startApplication } from "./helper.js";
import fs from "fs";
import path from "path";

describe("Aurora", () => {
  let app;

  beforeEach(async () => {
    const startedApp = await startApplication({
      args: [path.resolve(__dirname, "../")] // run on entire module
    });
    app = startedApp;
  });

  afterEach(() => {
    if (app && app.isRunning()) {
      return app.stop();
    }
  });

  test("It shows initial window", () => {
    return app.client.getWindowCount().then(function(count) {
      expect(count).toBe(1);
    });
  });
});
