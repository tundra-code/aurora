import {
  nextState,
  DEFAULT,
  INSTALLING,
  INSTALLED,
  ERROR,
  UNINSTALL,
  UNINSTALLED
} from "../InstallStates";

test("nextState goes through the correct order", () => {
  expect(nextState()).toBe(INSTALLING);
  expect(nextState(DEFAULT)).toBe(INSTALLING);
  expect(nextState(INSTALLING)).toBe(INSTALLED);
  expect(nextState(INSTALLED)).toBe(UNINSTALL);
  expect(nextState(UNINSTALL)).toBe(UNINSTALLED);
  expect(nextState(UNINSTALLED)).toBe(DEFAULT);
  expect(nextState(ERROR)).toBe(DEFAULT);
});
