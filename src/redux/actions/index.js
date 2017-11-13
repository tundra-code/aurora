/**
 * Action Name constants
 */
export const SET_SCREEN = "SET_SCREEN";
export const SET_PREFERENCES = "SET_PREFERENCES";

/**
 * Other constants
 */
export const SCREENS = {
  MAIN: "MAIN",
  STORE: "STORE"
};

/**
 * Action Creators
 */
export function setScreen(screen) {
  return { type: SET_SCREEN, screen };
}

export function setPreferences(preferences) {
  return { type: SET_PREFERENCES, preferences };
}
