const generators = require("./plops/generators");

/**
 * The final plop object.
 */
module.exports = function(plop) {
  // create your generators here
  plop.setGenerator("package", generators.package);
};
