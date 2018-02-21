import { loadPreferences, updatePreferences } from "../io";
import { setPreferences } from "../../redux/actions";

async function get() {
  return loadPreferences();
}

/**
 * @param {object} preferences is the updates to the preferences file
 * @param {function} dispatch is the redux dispatch function
 */
async function update(preferences, dispatch) {
  await updatePreferences(preferences);

  // Update redux store
  const newPrefs = await loadPreferences();
  dispatch(setPreferences(newPrefs));

  return newPrefs;
}

export default {
  update,
  get
};
