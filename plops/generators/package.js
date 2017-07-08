/**
 * Creates a path starting with the folder name
 * @param {String} extra 
 */
const getPath = extra => `packages/aurora-{{camelCase name}}/${extra}`;

// Asks for a package's name
const NAME_PROMPT = {
  type: "input",
  name: "name",
  message: "What is the package's name?",
  validate: function(value) {
    if (/.+/.test(value)) {
      return true;
    }
    return "name is required";
  }
};

const ADD_INDEX = {
  type: "add",
  path: getPath("index.js"),
  templateFile: "plops/templates/package/index.js"
};

const ADD_README = {
  type: "add",
  path: getPath("README.md"),
  templateFile: "plops/templates/package/README.md"
};

const ADD_PACKAGE_JSON = {
  type: "add",
  path: getPath("package.json"),
  templateFile: "plops/templates/package/package.json"
};

module.exports = {
  description: "creates a generic aurora-componentName style package",
  prompts: [NAME_PROMPT],
  actions: [ADD_INDEX, ADD_README, ADD_PACKAGE_JSON]
};
