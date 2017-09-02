const PLOP_PATH = "scripts/plops";
const PREFIX = "aurora";

/**
 * Creates a path starting with the folder name
 * @param {String} extra 
 */
const getOutputPath = extra => `packages/${PREFIX}-{{camelCase name}}/${extra}`;
const getTemplatePath = extra => `${PLOP_PATH}/templates/package/${extra}`;

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
  path: getOutputPath("index.js"),
  templateFile: getTemplatePath("index.js")
};

const ADD_TEST = {
  type: "add",
  path: getOutputPath("test/{{camelCase name}}.test.js"),
  templateFile: getTemplatePath("package.test.js")
};

const ADD_README = {
  type: "add",
  path: getOutputPath("README.md"),
  templateFile: getTemplatePath("README.md")
};

module.exports = {
  description: "creates a generic aurora-componentName style package",
  prompts: [NAME_PROMPT],
  actions: [ADD_INDEX, ADD_TEST, ADD_README]
};
