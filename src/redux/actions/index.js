/**
 * Action Name constants
 */
export const SET_SCREEN = "SET_SCREEN";
export const SET_PREFERENCES = "SET_PREFERENCES";

export const SET_TOAST = "SET_TOAST";

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

export function setToast(message, toastType = null) {
  return { type: SET_TOAST, message, toastType };

export function setPreferences(preferences) {
  return { type: SET_PREFERENCES, preferences };
}
