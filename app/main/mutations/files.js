const { updatePreferences } = require("../../../lib/io");
const { installMutations } = require("@react-mutate/loader");

function installNewMutation(name) {
  updatePreferences({
    mutations: {
      name
    }
  });

  installMutations([name]);
}

module.exports = {
  installNewMutation
};
