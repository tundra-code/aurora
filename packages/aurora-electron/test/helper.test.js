/**
 * Hey man, I heard you like test helpers,
 * so I put a test in your helper for your tests.
 */

import { getElectronPath } from "./helper.js";

test("getElectronPath functions correctly", () => {
  const path = getElectronPath();
  expect(path.endsWith("node_modules/.bin/electron")).toBe(true);
});

test("getElectronPath works on windows correctly", () => {
  process.platform = "win32";

  const path = getElectronPath();
  expect(path.endsWith("node_modules/.bin/electron.cmd")).toBe(true);
});
