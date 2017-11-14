import preferences from "../preferences";
import { installMutationFiles } from "../io/IO";
import _ from "lodash";

async function addMutationPreference(name, dispatch) {
  const prefs = await preferences.get();

  // Create mutations if it doesn't already exist
  const mutations = prefs.mutations || [];
  mutations.push({ name });
  prefs.mutations = mutations;

  return preferences.update(prefs, dispatch);
}

/**
 * Removes a mutation from the preference file.
 * @param {String} name
 */
async function removeMutationPreference(name, dispatch) {
  const prefsJSON = preferences.get();

  // Add to mutations or create new field in preferences
  const mutations = prefsJSON.mutations || [];
  prefsJSON.mutations = _.reject(mutations, { name });

  return preferences.update(prefsJSON, dispatch);
}

/**
 * Updates mutations based on preferences file
 */
export async function updateMutations() {
  const prefsJSON = await preferences.get();
  const mutations = prefsJSON.mutations || [];
  return installMutationFiles(mutations);
}

/**
 * Installs a new mutation.
 * @param {String} name
 * @param {function} dispatch
 */
export async function installMutation(name, dispatch) {
  await addMutationPreference(name, dispatch);
  return updateMutations();
}

/**
 * Uninstalls a mutation.
 * @param {String} name
 * @param {function} dispatch
 */
export async function uninstallMutation(name, dispatch) {
  await removeMutationPreference(name, dispatch);
  return updateMutations();
}
