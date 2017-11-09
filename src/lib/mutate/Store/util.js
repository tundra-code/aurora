import { MutationPrefix } from "../constants";
import _ from "lodash";

/**
 * Returns the string without the prefix "aurora-mutation"
 * @param {string} text 
 */
const removePrefix = text => {
  return _.replace(text, MutationPrefix, "");
};

export { removePrefix };
