import { MutationPrefix } from "../constants";
import _ from "lodash";

/**
 * Returns the string without the prefix "aurora-mutation"
 * @param {string} text
 */
const removePrefix = text => {
  return _.replace(text, MutationPrefix, "");
};

const pkgKey = pkg => {
  return `${pkg.name}@${pkg.version}`;
};

/**
 * Converts npm-search data into key value store
 * where the key is the package name
 */
const itemArrayToKeyValueObj = itemArray => {
  const obj = {};
  for (const item of itemArray) {
    obj[pkgKey(item.package)] = item;
  }
  return obj;
};

export { removePrefix, itemArrayToKeyValueObj, pkgKey };
