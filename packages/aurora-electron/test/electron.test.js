import { startApplication } from "./helper.js";
import path from "path";

// Only run this test on the CI.
// It tends to be finicky on this environment... for whatever reason.
if (process.env.CI) {
  describe("Aurora", () => {
    let app;

    beforeEach(async () => {
      const BUILD_PATH = path.resolve(__dirname, "..");
      const startedApp = await startApplication({
        args: [BUILD_PATH] // run on entire module
      });
      app = startedApp;
      return app;
    });

    afterEach(() => {
      if (app && app.isRunning()) {
        return app.stop();
      }
    });

    test("It shows initial window", () => {
      const ONLY_ONE_WINDOW = 1;
      return app.client.getWindowCount().then(count => {
        expect(count).toBe(ONLY_ONE_WINDOW);
      });
    });
  });
} else {
  test("Skipping this test on local machine", () => {});
}
