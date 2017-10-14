const { installMutations, loadMutations } = require("@react-mutate/loader");
const path = require("path");

const mutationsPath = path.resolve(__dirname, "./extensions");

const install = filepath => {
  const userMutations = []; // We have no mutations yet.
  return installMutations(userMutations, filepath);
};

const load = filepath => {
  return loadMutations(filepath);
};

const installAndLoadMutations = async () => {
  await install(mutationsPath);
  return await load(mutationsPath);
};

module.exports = {
  install,
  load,
  mutationsPath,
  installAndLoadMutations
};
