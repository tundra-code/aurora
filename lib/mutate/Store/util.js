import { MutationPrefix } from "../constants";
import str from "string";

/**
 * Returns the string without the prefix "aurora-mutation"
 * @param {string} text 
 */
const removePrefix = text => {
  return str(text)
    .chompLeft(MutationPrefix)
    .toString();
};

export { removePrefix };
