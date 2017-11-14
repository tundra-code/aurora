import _ from "lodash";
const actions = require("./index"); // Explicitly use require to grab all as an object

export function actionCreators() {
  const creators = [];
  for (const key in actions) {
    if (_.isFunction(actions[key])) {
      creators.push(actions[key]);
    }
  }
  return creators;
}

export function actionStrings() {
  const strs = [];
  for (const key in actions) {
    if (!_.isFunction(actions[key])) {
      strs.push(actions[key]);
    }
  }
  return strs;
}
