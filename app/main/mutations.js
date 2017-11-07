/**
 * WARNING: 
 * This file is required by the renderer process and can't be changed without changing that too.
 * I know there's a "mutations" folder and a mutations file. 
 */

const { installMutations } = require("@react-mutate/loader");
const os = require("os");
const path = require("path");
const defaultMutations = require("./defaultMutations");

const mutationsPath = path.join(
  os.homedir(),
  "aurora-extensions/mutations/node_modules"
); //DIS BAD TODO: FIX

// Install mutations on reload
installMutations(
  defaultMutations,
  path.join(os.homedir(), "aurora-extensions")
);

module.exports = {
  mutationsPath,
  defaultMutations
};
