import { startApplication } from "./helper.js";
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
      app.stop();
    }
  });

  test("It shows initial window", () => {
    const ONLY_ONE_WINDOW = 1;
    return app.client.getWindowCount().then(count => {
      expect(count).toBe(ONLY_ONE_WINDOW);
    });
  });
});
