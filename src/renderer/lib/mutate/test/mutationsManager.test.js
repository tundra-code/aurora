import { savePreferences, loadPreferences } from "../../io";
import {
  addMutationPreference,
  removeMutationPreference
} from "../mutationsManager";

test("addMutationPreference will create a new attribute in the preferences file", async () => {
  expect.assertions(1);

  // Create a base prefs file
  await savePreferences({ mutations: [{ name: "joe" }] });

  // Add a new mutation
  await addMutationPreference("bar", () => {});

  // Load and check if we actually changed something
  const prefs = await loadPreferences();
  expect(prefs.mutations).toMatchObject([{ name: "joe" }, { name: "bar" }]);
});

test("removeMutationPreference will remove a previous attribute in the preference file", async () => {
  expect.assertions(1);

  // Create a base prefs file
  await savePreferences({ mutations: [{ name: "joe" }, { name: "removeme" }] });

  // Remove the "removeme" preferences
  await removeMutationPreference("removeme", () => {});

  // Load and check that we changed something
  const prefs = await loadPreferences();
  expect(prefs.mutations).toMatchObject([{ name: "joe" }]);
});
